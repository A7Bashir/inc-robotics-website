const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initializeTransporter();
  }

  initializeTransporter() {
    // For development/testing, we'll use Gmail SMTP
    // In production, you should use a professional email service like SendGrid
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'your-email@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password'
      }
    });

    // Verify connection configuration
    this.transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email service configuration error:', error.message);
        console.log('📧 Please check your email credentials in .env file');
      } else {
        console.log('✅ Email service is ready to send emails');
      }
    });
  }

  async sendEmail({ to, subject, template, data }) {
    try {
      // For now, just log the email instead of sending
      console.log('📧 Email would be sent to:', to);
      console.log('📧 Subject:', subject);
      console.log('📧 Data:', data);
      
      // Simulate successful email sending
      return { messageId: 'simulated-' + Date.now() };

    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw error;
    }
  }

  generateEmailTemplate(template, data) {
    switch (template) {
      case 'gallery-tour':
        return this.generateGalleryTourTemplate(data);
      case 'general-contact':
        return this.generateGeneralContactTemplate(data);
      default:
        return this.generateDefaultTemplate(data);
    }
  }

  generateGalleryTourTemplate(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gallery Tour Request</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #0A1929 0%, #1E3A8A 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                margin-bottom: 30px;
            }
            .field {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #f8f9fa;
                border-left: 4px solid #3B82F6;
                border-radius: 4px;
            }
            .field-label {
                font-weight: bold;
                color: #0A1929;
                margin-bottom: 5px;
            }
            .field-value {
                color: #666;
            }
            .footer {
                text-align: center;
                padding-top: 20px;
                border-top: 1px solid #eee;
                color: #666;
                font-size: 14px;
            }
            .highlight {
                background-color: #e3f2fd;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🤖 New Gallery Tour Request</h1>
                <p>INC Robotics Website</p>
            </div>
            
            <div class="content">
                <div class="highlight">
                    <strong>📅 Request Details:</strong><br>
                    Submitted on ${data.timestamp}
                </div>

                <div class="field">
                    <div class="field-label">👤 Full Name:</div>
                    <div class="field-value">${data.name}</div>
                </div>

                <div class="field">
                    <div class="field-label">📧 Email Address:</div>
                    <div class="field-value">${data.email}</div>
                </div>

                <div class="field">
                    <div class="field-label">📱 Phone Number:</div>
                    <div class="field-value">${data.phone}</div>
                </div>

                <div class="field">
                    <div class="field-label">🏢 Company:</div>
                    <div class="field-value">${data.company}</div>
                </div>

                <div class="field">
                    <div class="field-label">📅 Preferred Date:</div>
                    <div class="field-value">${data.preferredDate}</div>
                </div>

                <div class="field">
                    <div class="field-label">⏰ Preferred Time:</div>
                    <div class="field-value">${data.preferredTime}</div>
                </div>

                <div class="field">
                    <div class="field-label">💬 Additional Message:</div>
                    <div class="field-value">${data.message}</div>
                </div>
            </div>

            <div class="footer">
                <p>This email was sent from the INC Robotics website contact form.</p>
                <p>Please respond to the customer's email address: <strong>${data.email}</strong></p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  generateGeneralContactTemplate(data) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>General Contact Request</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #0A1929 0%, #1E3A8A 100%);
                color: white;
                padding: 20px;
                border-radius: 8px;
                text-align: center;
                margin-bottom: 30px;
            }
            .field {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #f8f9fa;
                border-left: 4px solid #3B82F6;
                border-radius: 4px;
            }
            .field-label {
                font-weight: bold;
                color: #0A1929;
                margin-bottom: 5px;
            }
            .field-value {
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📧 General Contact Request</h1>
                <p>INC Robotics Website</p>
            </div>
            
            <div class="field">
                <div class="field-label">👤 Name:</div>
                <div class="field-value">${data.name}</div>
            </div>

            <div class="field">
                <div class="field-label">📧 Email:</div>
                <div class="field-value">${data.email}</div>
            </div>

            <div class="field">
                <div class="field-label">📝 Subject:</div>
                <div class="field-value">${data.subject}</div>
            </div>

            <div class="field">
                <div class="field-label">💬 Message:</div>
                <div class="field-value">${data.message}</div>
            </div>

            <div class="field">
                <div class="field-label">🕒 Submitted:</div>
                <div class="field-value">${data.timestamp}</div>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  generateDefaultTemplate(data) {
    return `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
    <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
    <p><strong>Message:</strong> ${data.message || 'N/A'}</p>
    <p><strong>Timestamp:</strong> ${data.timestamp || new Date().toISOString()}</p>
    `;
  }

  generateTextContent(template, data) {
    switch (template) {
      case 'gallery-tour':
        return `
New Gallery Tour Request - INC Robotics

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Company: ${data.company}
Preferred Date: ${data.preferredDate}
Preferred Time: ${data.preferredTime}
Message: ${data.message}

Submitted: ${data.timestamp}

Please respond to: ${data.email}
        `;
      case 'general-contact':
        return `
General Contact Request - INC Robotics

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}

Submitted: ${data.timestamp}

Please respond to: ${data.email}
        `;
      default:
        return `
Contact Request - INC Robotics

Name: ${data.name || 'N/A'}
Email: ${data.email || 'N/A'}
Message: ${data.message || 'N/A'}

Submitted: ${data.timestamp || new Date().toISOString()}
        `;
    }
  }
}

module.exports = new EmailService();
