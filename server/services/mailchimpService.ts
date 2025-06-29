// @ts-ignore - no type definitions available
import mailchimp from '@mailchimp/mailchimp_marketing';

interface MailchimpConfig {
  apiKey: string;
  server: string;
  listId: string;
}

interface SubscriberData {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  source?: string;
}

interface SubscriptionResult {
  success: boolean;
  message: string;
  status?: string;
}

export class MailchimpService {
  private config: MailchimpConfig;

  constructor() {
    const apiKey = process.env.MAILCHIMP_API_KEY || '';
    // Extract server from API key (format: key-us10)
    const server = apiKey.includes('-') ? apiKey.split('-').pop() || '' : process.env.MAILCHIMP_SERVER || '';
    
    this.config = {
      apiKey: apiKey,
      server: server,
      listId: process.env.MAILCHIMP_AUDIENCE_ID || ''
    };

    if (this.config.apiKey && this.config.server) {
      mailchimp.setConfig({
        apiKey: this.config.apiKey,
        server: this.config.server
      });
    }
  }

  async isConfigured(): Promise<boolean> {
    return !!(this.config.apiKey && this.config.server && this.config.listId);
  }

  async addSubscriber(subscriberData: SubscriberData): Promise<SubscriptionResult> {
    if (!await this.isConfigured()) {
      return {
        success: false,
        message: 'Mailchimp is not configured. Please provide API credentials.'
      };
    }

    try {
      const { email, firstName, lastName, tags = [], source = 'website' } = subscriberData;

      // Add subscriber to audience
      const response = await mailchimp.lists.addListMember(this.config.listId, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName || '',
          LNAME: lastName || ''
        },
        tags: [...tags, source].filter(Boolean)
      });

      return {
        success: true,
        message: 'Successfully subscribed to GridMix updates!',
        status: response.status
      };

    } catch (error: any) {
      // Handle duplicate email
      if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
        return {
          success: false,
          message: 'You are already subscribed to our newsletter!'
        };
      }

      // Handle invalid email
      if (error.status === 400 && error.response?.body?.detail?.includes('email')) {
        return {
          success: false,
          message: 'Please enter a valid email address.'
        };
      }

      console.error('Mailchimp API error:', error);
      return {
        success: false,
        message: 'There was an error subscribing. Please try again later.'
      };
    }
  }

  async getAudienceInfo(): Promise<any> {
    if (!await this.isConfigured()) {
      return null;
    }

    try {
      const response = await mailchimp.lists.getList(this.config.listId);
      return {
        name: response.name,
        memberCount: response.stats.member_count,
        subscribeUrlShort: response.subscribe_url_short
      };
    } catch (error) {
      console.error('Error fetching audience info:', error);
      return null;
    }
  }

  async testConnection(): Promise<boolean> {
    if (!await this.isConfigured()) {
      return false;
    }

    try {
      await mailchimp.ping.get();
      return true;
    } catch (error) {
      console.error('Mailchimp connection test failed:', error);
      return false;
    }
  }
}

export const mailchimpService = new MailchimpService();