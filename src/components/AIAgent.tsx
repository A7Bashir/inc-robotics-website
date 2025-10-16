import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../styles/theme';
import { useLanguage } from '../contexts/LanguageContext';
import { aliVertexAIService } from '../services/vertexAIService';
import { crmService, LeadData } from '../services/crmService';
import { ENV as environment } from '../config/environment';

const ChatWidget = styled(motion.div)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  font-family: ${theme.fonts.primary};
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.4);
    border-color: ${theme.colors.accent};
  }
`;

const PulsingRing = styled(motion.div)`
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border: 4px solid ${theme.colors.primary};
  border-radius: 50%;
  background: rgba(0, 123, 255, 0.1);
  opacity: 0.8;
  z-index: 1;
`;

const FloatingBubble = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 20px;
  background: white;
  color: ${theme.colors.gray[800]};
  padding: 8px 20px;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  font-size: 14px;
  font-weight: 500;
  max-width: 300px;
  min-width: 250px;
  z-index: 1001;
  border: 1px solid ${theme.colors.gray[200]};
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    right: 20px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 8px solid white;
  }
`;

const CloseBubbleButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${theme.colors.gray[400]};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  
  &:hover {
    background: ${theme.colors.gray[500]};
  }
`;

const ChatButtonIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
  color: white;
  padding: 20px;
  text-align: center;
  position: relative;
`;

const AgentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
`;

const AgentAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AgentAvatarIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const AgentStatus = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AgentName = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: white;
`;

const AgentStatusText = styled.span`
  font-size: 12px;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
`;

const MessageContainer = styled.div<{ $isUser: boolean }>`
  margin-bottom: 15px;
  display: flex;
  flex-direction: ${props => props.$isUser ? 'row-reverse' : 'row'};
  align-items: flex-end;
  gap: 8px;
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 18px;
  background: ${props => props.$isUser ? theme.colors.primary : 'white'};
  color: ${props => props.$isUser ? 'white' : theme.colors.gray[700]};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.4;
`;

const MessageTime = styled.span`
  font-size: 11px;
  color: ${theme.colors.gray[500]};
  margin-top: 4px;
  display: block;
`;

const ChatInput = styled.div`
  padding: 20px;
  background: white;
  border-top: 1px solid #e9ecef;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${theme.colors.accent};
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.accent};
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  overflow: hidden;
  
  &:hover {
    background: ${theme.colors.primary};
    transform: scale(1.05);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const SendButtonIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
`;

const ErrorIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #fee2e2;
  border: 1px solid #fecaca;
  border-radius: 18px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 15px;
`;

const RetryButton = styled.button`
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #b91c1c;
  }
`;

const TypingDot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.colors.gray[400]};
  animation: typing 1.4s infinite ease-in-out;
  animation-delay: ${props => props.$delay}s;
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

const SuggestionsContainer = styled.div`
  margin-top: 10px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e9ecef;
`;

const SuggestionsTitle = styled.div`
  font-size: 12px;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.gray[600]};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SuggestionChip = styled.button`
  display: inline-block;
  padding: 6px 12px;
  margin: 2px;
  background: white;
  border: 1px solid ${theme.colors.primary};
  border-radius: 16px;
  font-size: 12px;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
`;

const ConsultationContainer = styled.div`
  margin-top: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  border-radius: 12px;
  border: 1px solid #dee2e6;
`;

const ConsultationHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary};
  font-size: 14px;
`;

const RecommendationsList = styled.div`
  margin-bottom: 12px;
`;

const RecommendationItem = styled.div`
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 8px;
  border-left: 3px solid ${theme.colors.accent};
  font-size: 13px;
  line-height: 1.4;
`;

const RobotTag = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${theme.colors.primary};
  color: white;
  border-radius: 12px;
  font-size: 11px;
  font-weight: ${theme.fontWeights.semibold};
  margin: 2px;
`;

const FollowUpContainer = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: rgba(0, 123, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(0, 123, 255, 0.1);
`;

const FollowUpTitle = styled.div`
  font-size: 12px;
  font-weight: ${theme.fontWeights.semibold};
  color: ${theme.colors.primary};
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FollowUpQuestion = styled.button`
  display: block;
  width: 100%;
  padding: 8px 12px;
  margin: 4px 0;
  background: white;
  border: 1px solid ${theme.colors.primary};
  border-radius: 6px;
  font-size: 12px;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: ${theme.colors.primary};
    color: white;
  }
`;


const UrgencyIndicator = styled.div<{ $urgency: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: ${theme.fontWeights.semibold};
  background: ${props => 
    props.$urgency === 'high' ? '#dc3545' :
    props.$urgency === 'medium' ? '#ffc107' :
    '#28a745'
  };
  color: white;
  margin-left: 8px;
`;

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  language?: 'en' | 'ar';
  suggestions?: string[];
  consultationType?: 'facility_analysis' | 'event_planning' | 'roi_calculation' | 'solution_design' | 'company_inquiry' | 'general_inquiry' | 'cleaning_solutions';
  recommendations?: {
    robots: string[];
    reasoning: string;
    implementation: string;
    roi?: string;
  };
  followUpQuestions?: string[];
}

const AIAgent: React.FC = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [hasSeenBubble, setHasSeenBubble] = useState(false);
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: aliVertexAIService.getWelcomeMessage(language),
      isUser: false,
      timestamp: new Date(),
      language: language
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Initialize conversation and update welcome message when language changes
  useEffect(() => {
    if (!conversationId) {
      setConversationId(`conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
    
    setMessages(prev => {
      const updatedMessages = [...prev];
      if (updatedMessages.length > 0 && !updatedMessages[0].isUser) {
        updatedMessages[0] = {
          ...updatedMessages[0],
          text: aliVertexAIService.getWelcomeMessage(language),
          language: language
        };
      }
      return updatedMessages;
    });
  }, [language, conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show floating bubble after 3 seconds if not seen before
  useEffect(() => {
    if (!hasSeenBubble) {
      const timer = setTimeout(() => {
        setShowBubble(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenBubble]);

  // Auto-hide bubble after 10 seconds
  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        setShowBubble(false);
        setHasSeenBubble(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const closeBubble = () => {
    setShowBubble(false);
    setHasSeenBubble(true);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
      language: language
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsError(false);

    try {
      // Get AI response using Ali's enhanced Vertex AI service
      const aiResponse = await aliVertexAIService.processMessage(inputValue, language, conversationId);
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.message,
        isUser: false,
        timestamp: new Date(),
        language: aiResponse.language,
        suggestions: aiResponse.suggestions,
        consultationType: aiResponse.consultationType,
        recommendations: aiResponse.recommendations,
        followUpQuestions: aiResponse.followUpQuestions,
      };

      setMessages(prev => [...prev, aiMessage]);

      // Show spelling correction if available
      if (aiResponse.spellingCorrection && aiResponse.spellingCorrection.confidence > 0.7) {
        // Spelling correction applied
      }

      // Log enhancement data for debugging
      if (aiResponse.enhancement) {
        // Response enhanced
      }

      // Capture lead if contact information is provided
      if (environment.ENABLE_CRM) {
        await captureLeadIfNeeded(inputValue, aiResponse.suggestedActions || []);
      }

    } catch (error) {
      // Error getting AI response
      setIsError(true);
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: language === 'ar' 
          ? 'عذراً، واجهت مشكلة تقنية. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني.'
          : 'Sorry, I encountered a technical issue. Please try again or contact us directly via phone or email.',
        isUser: false,
        timestamp: new Date(),
        language: language
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Capture lead if contact information is detected
  const captureLeadIfNeeded = async (message: string, suggestedActions: string[]) => {
    try {
      // Extract contact information from the conversation
      const conversationText = messages.map(m => m.text).join(' ') + ' ' + message;
      const contactInfo = crmService.extractContactInfo(conversationText);
      
      // Only capture if we have at least an email or phone
      if (contactInfo.email || contactInfo.phone) {
        const leadData: Omit<LeadData, 'id' | 'timestamp' | 'status'> = {
          name: contactInfo.name || 'Unknown',
          email: contactInfo.email || '',
          phone: contactInfo.phone,
          company: contactInfo.company,
          message: message,
          source: 'website_chat',
          language: language,
          conversationHistory: conversationText,
          suggestedActions: suggestedActions
        };

        const result = await crmService.captureLead(leadData);
        if (result.success) {
          // Lead captured successfully
        }
      }
    } catch (error) {
      // Error capturing lead
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ChatWidget>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ChatHeader>
              <AgentInfo>
                <AgentAvatar>
                  <AgentAvatarIcon src="/images/tab icon.webp" alt="INC Robotics" />
                </AgentAvatar>
                <AgentStatus>
                  <AgentName>{t('agent.name')}</AgentName>
                  <AgentStatusText>{t('agent.status')}</AgentStatusText>
                </AgentStatus>
              </AgentInfo>
              <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
            </ChatHeader>

            <ChatMessages>
              {messages.map((message) => (
                <MessageContainer key={message.id} $isUser={message.isUser}>
                  <MessageBubble $isUser={message.isUser} style={{ position: 'relative' }}>
                    {message.text}
                    <MessageTime>
                      {formatTime(message.timestamp)}
                    </MessageTime>
                    

                    {/* Consultation Recommendations */}
                    {message.recommendations && (
                      <ConsultationContainer>
                        <ConsultationHeader>
                          🎯 {language === 'ar' ? 'توصياتي لك:' : 'My Recommendations:'}
                        </ConsultationHeader>
                        <RecommendationsList>
                          <RecommendationItem>
                            <strong>{language === 'ar' ? 'الروبوتات المقترحة:' : 'Recommended Robots:'}</strong>
                            <div style={{ marginTop: '4px' }}>
                              {message.recommendations && Array.isArray(message.recommendations) && message.recommendations.map((robot: any, index: number) => (
                                <RobotTag key={index}>{robot.name || robot}</RobotTag>
                              ))}
                            </div>
                          </RecommendationItem>
                          {message.recommendations && !Array.isArray(message.recommendations) && message.recommendations.reasoning && (
                            <RecommendationItem>
                              <strong>{language === 'ar' ? 'السبب:' : 'Reasoning:'}</strong> {message.recommendations.reasoning}
                            </RecommendationItem>
                          )}
                          {message.recommendations && !Array.isArray(message.recommendations) && message.recommendations.implementation && (
                            <RecommendationItem>
                              <strong>{language === 'ar' ? 'التنفيذ:' : 'Implementation:'}</strong> {message.recommendations.implementation}
                            </RecommendationItem>
                          )}
                          {message.recommendations && !Array.isArray(message.recommendations) && message.recommendations.roi && (
                            <RecommendationItem>
                              <strong>{language === 'ar' ? 'العائد على الاستثمار:' : 'ROI:'}</strong> {message.recommendations.roi}
                            </RecommendationItem>
                          )}
                        </RecommendationsList>
                      </ConsultationContainer>
                    )}

                    {/* Follow-up Questions */}
                    {message.followUpQuestions && message.followUpQuestions.length > 0 && (
                      <FollowUpContainer>
                        <FollowUpTitle>
                          ❓ {language === 'ar' ? 'أسئلة إضافية:' : 'Follow-up Questions:'}
                        </FollowUpTitle>
                        {message.followUpQuestions && message.followUpQuestions.map((question: string, index: number) => (
                          <FollowUpQuestion
                            key={index}
                            onClick={() => setInputValue(question)}
                          >
                            {question}
                          </FollowUpQuestion>
                        ))}
                      </FollowUpContainer>
                    )}

                    {/* Regular Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <SuggestionsContainer>
                        <SuggestionsTitle>
                          💡 {language === 'ar' ? 'اقتراحات:' : 'Suggestions:'}
                        </SuggestionsTitle>
                        {message.suggestions && message.suggestions.map((suggestion: string, index: number) => (
                          <SuggestionChip
                            key={index}
                            onClick={() => setInputValue(suggestion)}
                          >
                            {suggestion}
                          </SuggestionChip>
                        ))}
                      </SuggestionsContainer>
                    )}
                  </MessageBubble>
                </MessageContainer>
              ))}
              
              {isTyping && (
                <MessageContainer $isUser={false}>
                  <TypingIndicator>
                    <TypingDot $delay={0} />
                    <TypingDot $delay={0.2} />
                    <TypingDot $delay={0.4} />
                  </TypingIndicator>
                </MessageContainer>
              )}
              
              {isError && (
                <MessageContainer $isUser={false}>
                  <ErrorIndicator>
                    <span>{language === 'ar' ? '⚠️ خطأ في الاتصال' : '⚠️ Connection Error'}</span>
                    <RetryButton onClick={() => setIsError(false)}>
                      {language === 'ar' ? 'إعادة المحاولة' : 'Retry'}
                    </RetryButton>
                  </ErrorIndicator>
                </MessageContainer>
              )}
              
              <div ref={messagesEndRef} />
            </ChatMessages>

            <ChatInput>
              <InputContainer>
                <MessageInput
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('agent.placeholder')}
                  disabled={isTyping}
                />
                <SendButton 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <SendButtonIcon src="/images/tab icon.webp" alt="Send" />
                </SendButton>
              </InputContainer>
            </ChatInput>
          </ChatWindow>
        )}
      </AnimatePresence>

      <ChatButton
        onClick={() => {
          setIsOpen(!isOpen);
          closeBubble();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
      >
        <PulsingRing
          animate={{
            scale: [1, 1.6, 1],
            opacity: [1, 0.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <ChatButtonIcon src="/images/tab icon.webp" alt="INC Robotics" />
      </ChatButton>

      <AnimatePresence>
        {showBubble && (
          <FloatingBubble
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <CloseBubbleButton onClick={closeBubble}>×</CloseBubbleButton>
            {language === 'ar' 
              ? "مرحباً! أنا علي، مستشارك في حلول الروبوتات والذكاء الاصطناعي من معيار الذكاء. انقر للاستشارة!" 
              : "Hi! I'm Ali, your robotics and AI solutions consultant from INC Robotics. Click to consult!"
            }
          </FloatingBubble>
        )}
      </AnimatePresence>
    </ChatWidget>
  );
};

export default AIAgent;
