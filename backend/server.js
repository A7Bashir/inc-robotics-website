const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const emailService = require('./services/emailService');
const GeminiDirectService = require('./services/geminiDirectService');

// Initialize Gemini Direct Service (with real Gemini API)
const aliAIService = GeminiDirectService;

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/contact', limiter);

// CORS configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://regal-rolypoly-74982b.netlify.app', 'https://incrobotics.com', 'https://www.incrobotics.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'INC Robotics Backend API is running',
    timestamp: new Date().toISOString()
  });
});

// Gallery tour request endpoint
app.post('/api/contact/gallery-tour', async (req, res) => {
  try {
    const { name, email, phone, company, preferredDate, preferredTime, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and phone are required fields'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Prepare email data
    const emailData = {
      to: process.env.RECIPIENT_EMAIL || 'Ahmed.bashir@incrobotics.com',
      subject: 'New Gallery Tour Request - INC Robotics',
      template: 'gallery-tour',
      data: {
        name,
        email,
        phone,
        company: company || 'Not provided',
        preferredDate: preferredDate || 'Not specified',
        preferredTime: preferredTime || 'Not specified',
        message: message || 'No additional message',
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Riyadh',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    };

    // Send email
    await emailService.sendEmail(emailData);

    // Log the submission
    console.log('Gallery tour request received:', {
      name,
      email,
      phone,
      company,
      preferredDate,
      preferredTime,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Thank you for your interest! We will contact you soon to schedule your gallery tour.'
    });

  } catch (error) {
    console.error('Error processing gallery tour request:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again later.'
    });
  }
});

// General contact endpoint (for future use)
app.post('/api/contact/general', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const emailData = {
      to: process.env.RECIPIENT_EMAIL || 'Ahmed.bashir@incrobotics.com',
      subject: `Contact Form: ${subject}`,
      template: 'general-contact',
      data: {
        name,
        email,
        subject,
        message,
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'Asia/Riyadh',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    };

    await emailService.sendEmail(emailData);

    res.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });

  } catch (error) {
    console.error('Error processing general contact:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error processing your request. Please try again later.'
    });
  }
});

// Ali AI Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language = 'en', conversationId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Get Ali's response
    const aiResponse = await aliAIService.processMessage(message, language, conversationId);

    res.json({
      success: true,
      data: aiResponse
    });

  } catch (error) {
    console.error('Error processing chat message:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, I encountered an error. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 INC Robotics Backend API running on port ${PORT}`);
  console.log(`📧 Email service configured for: ${process.env.RECIPIENT_EMAIL || 'Ahmed.bashir@incrobotics.com'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = app;
