import axios from 'axios';

export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: 'website_chat';
  language: 'en' | 'ar';
  timestamp: Date;
  conversationHistory?: string;
  suggestedActions?: string[];
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
}

export interface CRMResponse {
  success: boolean;
  leadId?: string;
  message: string;
  error?: string;
}

class CRMService {
  private apiBaseUrl: string;
  private apiKey: string;

  constructor() {
    // You can configure these via environment variables
    this.apiBaseUrl = process.env.REACT_APP_CRM_API_URL || 'https://api.inc-robotics.com/crm';
    this.apiKey = process.env.REACT_APP_CRM_API_KEY || '';
  }

  // Capture lead from chat conversation
  async captureLead(leadData: Omit<LeadData, 'id' | 'timestamp' | 'status'>): Promise<CRMResponse> {
    try {
      const fullLeadData: LeadData = {
        ...leadData,
        id: this.generateLeadId(),
        timestamp: new Date(),
        status: 'new'
      };

      // For now, we'll store in localStorage as a demo
      // In production, this would send to your CRM API
      if (this.apiKey) {
        return await this.sendToCRMAPI(fullLeadData);
      } else {
        return await this.storeLocally(fullLeadData);
      }
    } catch (error) {
      console.error('Error capturing lead:', error);
      return {
        success: false,
        message: 'Failed to capture lead information',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Send lead data to CRM API
  private async sendToCRMAPI(leadData: LeadData): Promise<CRMResponse> {
    try {
      const response = await axios.post(process.env.REACT_APP_CRM_API_URL || 'https://api.inc-robotics.com/crm/leads', {
        ...leadData,
        source: 'website_ai_agent',
        timestamp: new Date().toISOString()
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_CRM_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      return {
        success: true,
        leadId: response.data.leadId || leadData.id,
        message: 'Lead captured successfully'
      };
    } catch (error) {
      console.error('CRM API Error:', error);
      // Fallback to local storage
      return this.storeLocally(leadData);
    }
  }

  // Store lead locally (demo/fallback)
  private async storeLocally(leadData: LeadData): Promise<CRMResponse> {
    try {
      // Get existing leads from localStorage
      const existingLeads = this.getLocalLeads();
      
      // Add new lead
      existingLeads.push(leadData);
      
      // Save back to localStorage
      localStorage.setItem('inc_robotics_leads', JSON.stringify(existingLeads));
      
      // Also log to console for demo purposes
      console.log('New Lead Captured:', leadData);
      
      return {
        success: true,
        leadId: leadData.id,
        message: 'Lead captured locally (demo mode)'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to store lead locally',
        error: error instanceof Error ? error.message : 'Storage Error'
      };
    }
  }

  // Get all leads from local storage
  getLocalLeads(): LeadData[] {
    try {
      const leadsJson = localStorage.getItem('inc_robotics_leads');
      return leadsJson ? JSON.parse(leadsJson) : [];
    } catch (error) {
      console.error('Error reading local leads:', error);
      return [];
    }
  }

  // Update lead status
  async updateLeadStatus(leadId: string, status: LeadData['status']): Promise<CRMResponse> {
    try {
      const leads = this.getLocalLeads();
      const leadIndex = leads.findIndex(lead => lead.id === leadId);
      
      if (leadIndex === -1) {
        return {
          success: false,
          message: 'Lead not found'
        };
      }

      leads[leadIndex].status = status;
      localStorage.setItem('inc_robotics_leads', JSON.stringify(leads));

      return {
        success: true,
        message: 'Lead status updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update lead status',
        error: error instanceof Error ? error.message : 'Update Error'
      };
    }
  }

  // Generate unique lead ID
  private generateLeadId(): string {
    return `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Extract contact information from conversation
  extractContactInfo(conversationHistory: string): Partial<LeadData> {
    const contactInfo: Partial<LeadData> = {};

    // Extract email
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emailMatch = conversationHistory.match(emailRegex);
    if (emailMatch) {
      contactInfo.email = emailMatch[0];
    }

    // Extract phone (Saudi phone numbers)
    const phoneRegex = /(\+966|966|0)?[5-9][0-9]{8}/g;
    const phoneMatch = conversationHistory.match(phoneRegex);
    if (phoneMatch) {
      contactInfo.phone = phoneMatch[0];
    }

    // Extract company name (look for common company indicators)
    const companyRegex = /(?:company|شركة|مؤسسة|organization|corp|llc|inc|limited|محدودة)\s*:?\s*([A-Za-z\u0600-\u06FF\s]+)/gi;
    const companyMatch = conversationHistory.match(companyRegex);
    if (companyMatch) {
      contactInfo.company = companyMatch[0].replace(/(?:company|شركة|مؤسسة|organization|corp|llc|inc|limited|محدودة)\s*:?\s*/gi, '').trim();
    }

    return contactInfo;
  }

  // Get analytics data
  getAnalytics(): {
    totalLeads: number;
    leadsByStatus: Record<string, number>;
    leadsByLanguage: Record<string, number>;
    leadsBySource: Record<string, number>;
  } {
    const leads = this.getLocalLeads();
    
    const analytics = {
      totalLeads: leads.length,
      leadsByStatus: {} as Record<string, number>,
      leadsByLanguage: {} as Record<string, number>,
      leadsBySource: {} as Record<string, number>
    };

    leads.forEach(lead => {
      // Count by status
      analytics.leadsByStatus[lead.status] = (analytics.leadsByStatus[lead.status] || 0) + 1;
      
      // Count by language
      analytics.leadsByLanguage[lead.language] = (analytics.leadsByLanguage[lead.language] || 0) + 1;
      
      // Count by source
      analytics.leadsBySource[lead.source] = (analytics.leadsBySource[lead.source] || 0) + 1;
    });

    return analytics;
  }
}

// Export singleton instance
export const crmService = new CRMService();
export default crmService;
