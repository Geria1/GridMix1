import { MailService } from '@sendgrid/mail';
import twilio from 'twilio';

interface EmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

interface SMSParams {
  to: string;
  message: string;
}

interface AlertNotificationData {
  alertName: string;
  alertType: string;
  threshold: number;
  currentValue: number;
  condition: string;
  timestamp: Date;
}

export class NotificationService {
  private mailService?: MailService;
  private twilioClient?: twilio.Twilio;

  constructor() {
    // Initialize SendGrid
    if (process.env.SENDGRID_API_KEY) {
      this.mailService = new MailService();
      this.mailService.setApiKey(process.env.SENDGRID_API_KEY);
    }

    // Initialize Twilio
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
  }

  async sendEmail(params: EmailParams): Promise<{ success: boolean; error?: string }> {
    if (!this.mailService) {
      return { success: false, error: 'SendGrid not configured' };
    }

    try {
      await this.mailService.send({
        to: params.to,
        from: 'alerts@gridmix.co.uk',
        subject: params.subject,
        text: params.text,
        html: params.html,
      });
      return { success: true };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  async sendSMS(params: SMSParams): Promise<{ success: boolean; error?: string }> {
    if (!this.twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
      return { success: false, error: 'Twilio not configured' };
    }

    try {
      await this.twilioClient.messages.create({
        body: params.message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: params.to,
      });
      return { success: true };
    } catch (error) {
      console.error('SMS sending failed:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  generateAlertEmailHtml(data: AlertNotificationData): string {
    const alertTypeLabel = {
      carbon_intensity: 'Carbon Intensity',
      renewable_share: 'Renewable Share',
      total_demand: 'Total Demand'
    }[data.alertType] || data.alertType;

    const unit = {
      carbon_intensity: 'gCO₂/kWh',
      renewable_share: '%',
      total_demand: 'MW'
    }[data.alertType] || '';

    const conditionText = {
      below: 'dropped below',
      above: 'risen above',
      equals: 'reached'
    }[data.condition] || data.condition;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GridMix Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #2563eb, #10b981); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 30px; }
          .alert-box { background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .value { font-size: 24px; font-weight: bold; color: #0ea5e9; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; color: #64748b; font-size: 14px; }
          .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚡ GridMix Alert</h1>
            <p>${data.alertName}</p>
          </div>
          <div class="content">
            <h2>Alert Triggered</h2>
            <p>Your custom alert "<strong>${data.alertName}</strong>" has been triggered.</p>
            
            <div class="alert-box">
              <h3>${alertTypeLabel} has ${conditionText} your threshold</h3>
              <p><strong>Current Value:</strong> <span class="value">${data.currentValue} ${unit}</span></p>
              <p><strong>Your Threshold:</strong> ${data.threshold} ${unit}</p>
              <p><strong>Condition:</strong> ${conditionText}</p>
              <p><strong>Time:</strong> ${data.timestamp.toLocaleString('en-GB', { timeZone: 'Europe/London' })} GMT</p>
            </div>

            <p>This alert helps you track UK energy grid conditions in real-time. Take advantage of cleaner energy periods or high renewable generation!</p>
            
            <a href="https://gridmix.co.uk" class="btn">View Live Dashboard</a>
          </div>
          <div class="footer">
            <p>GridMix - UK Real-Time Energy Dashboard</p>
            <p>To manage your alerts, visit <a href="https://gridmix.co.uk/alerts">gridmix.co.uk/alerts</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  generateAlertSMS(data: AlertNotificationData): string {
    const alertTypeLabel = {
      carbon_intensity: 'Carbon Intensity',
      renewable_share: 'Renewable Share',
      total_demand: 'Total Demand'
    }[data.alertType] || data.alertType;

    const unit = {
      carbon_intensity: 'gCO₂/kWh',
      renewable_share: '%',
      total_demand: 'MW'
    }[data.alertType] || '';

    const conditionText = {
      below: 'dropped below',
      above: 'risen above',
      equals: 'reached'
    }[data.condition] || data.condition;

    return `🔔 GridMix Alert: ${alertTypeLabel} has ${conditionText} ${data.threshold}${unit}. Current: ${data.currentValue}${unit}. View details: gridmix.co.uk`;
  }

  async sendAlertNotification(
    user: { email: string; phone?: string },
    alertData: AlertNotificationData,
    deliveryMethods: string[]
  ): Promise<{ email?: boolean; sms?: boolean; errors: string[] }> {
    const results: { email?: boolean; sms?: boolean; errors: string[] } = { errors: [] };

    // Send email if requested
    if (deliveryMethods.includes('email') && user.email) {
      const emailResult = await this.sendEmail({
        to: user.email,
        subject: `GridMix Alert: ${alertData.alertName}`,
        html: this.generateAlertEmailHtml(alertData),
        text: `GridMix Alert: ${alertData.alertName}\n\n${alertData.alertType} has ${alertData.condition} your threshold of ${alertData.threshold}. Current value: ${alertData.currentValue}.\n\nView live dashboard: https://gridmix.co.uk`,
      });
      results.email = emailResult.success;
      if (!emailResult.success && emailResult.error) {
        results.errors.push(`Email: ${emailResult.error}`);
      }
    }

    // Send SMS if requested
    if (deliveryMethods.includes('sms') && user.phone) {
      const smsResult = await this.sendSMS({
        to: user.phone,
        message: this.generateAlertSMS(alertData),
      });
      results.sms = smsResult.success;
      if (!smsResult.success && smsResult.error) {
        results.errors.push(`SMS: ${smsResult.error}`);
      }
    }

    return results;
  }
}

export const notificationService = new NotificationService();