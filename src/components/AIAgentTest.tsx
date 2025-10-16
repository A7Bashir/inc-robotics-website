import React, { useState } from 'react';
import styled from 'styled-components';
import { geminiAIService } from '../services/geminiService';
import { crmService } from '../services/crmService';
import { ENV as environment } from '../config/environment';

const TestContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  max-width: 400px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const TestTitle = styled.h3`
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 18px;
`;

const TestButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  margin: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #2563eb;
  }
  
  &:disabled {
    background: #9ca3af;
    cursor: not-allowed;
  }
`;

const TestResult = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
  margin: 8px 0;
  font-size: 14px;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
`;

const StatusIndicator = styled.div<{ $status: 'success' | 'error' | 'warning' }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${props => 
    props.$status === 'success' ? '#10b981' :
    props.$status === 'error' ? '#ef4444' :
    '#f59e0b'
  };
`;

const AIAgentTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string, status: 'success' | 'error' | 'warning' = 'success') => {
    const timestamp = new Date().toLocaleTimeString();
    const statusIcon = status === 'success' ? '✅' : status === 'error' ? '❌' : '⚠️';
    setTestResults(prev => [...prev, `[${timestamp}] ${statusIcon} ${message}`]);
  };

  const testEnvironment = () => {
    addResult('Testing environment configuration...');
    
    if (environment.GOOGLE_CLOUD_PROJECT_ID) {
      addResult('✅ Google Cloud Project ID is configured');
    } else {
      addResult('❌ Google Cloud Project ID is missing', 'error');
    }
    
    if (environment.ENABLE_AI) {
      addResult('✅ AI is enabled');
    } else {
      addResult('⚠️ AI is disabled', 'warning');
    }
    
    if (environment.ENABLE_CRM) {
      addResult('✅ CRM is enabled');
    } else {
      addResult('⚠️ CRM is disabled', 'warning');
    }
  };

  const testAIConnection = async () => {
    setIsRunning(true);
    addResult('Testing AI connection...');
    
    try {
      const response = await geminiAIService.processMessage('Hello, can you tell me about your robots?', 'en');
      addResult(`✅ AI Response: ${response.message.substring(0, 100)}...`);
    } catch (error) {
      addResult(`❌ AI Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
    
    setIsRunning(false);
  };

  const testBilingualSupport = async () => {
    setIsRunning(true);
    addResult('Testing bilingual support...');
    
    try {
      const englishResponse = await geminiAIService.processMessage('What robots do you have?', 'en');
      addResult(`✅ English Response: ${englishResponse.message.substring(0, 50)}...`);
      
      const arabicResponse = await geminiAIService.processMessage('ما هي الروبوتات التي لديكم؟', 'ar');
      addResult(`✅ Arabic Response: ${arabicResponse.message.substring(0, 50)}...`);
    } catch (error) {
      addResult(`❌ Bilingual Test Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
    
    setIsRunning(false);
  };

  const testCRM = () => {
    addResult('Testing CRM functionality...');
    
    try {
      const testLead = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+966501234567',
        company: 'Test Company',
        message: 'Test message',
        source: 'website_chat' as const,
        language: 'en' as const
      };
      
      crmService.captureLead(testLead).then(result => {
        if (result.success) {
          addResult(`✅ Lead captured: ${result.leadId}`);
        } else {
          addResult(`❌ Lead capture failed: ${result.message}`, 'error');
        }
      });
      
      const analytics = crmService.getAnalytics();
      addResult(`✅ Analytics: ${analytics.totalLeads} total leads`);
    } catch (error) {
      addResult(`❌ CRM Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <TestContainer>
      <TestTitle>🤖 AI Agent Test Panel</TestTitle>
      
      <div>
        <TestButton onClick={testEnvironment} disabled={isRunning}>
          Test Environment
        </TestButton>
        <TestButton onClick={testAIConnection} disabled={isRunning}>
          Test AI Connection
        </TestButton>
        <TestButton onClick={testBilingualSupport} disabled={isRunning}>
          Test Bilingual
        </TestButton>
        <TestButton onClick={testCRM} disabled={isRunning}>
          Test CRM
        </TestButton>
        <TestButton onClick={clearResults} disabled={isRunning}>
          Clear Results
        </TestButton>
      </div>
      
      {testResults.length > 0 && (
        <TestResult>
          {testResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </TestResult>
      )}
    </TestContainer>
  );
};

export default AIAgentTest;
