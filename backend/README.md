# INC Robotics Backend API

This is the backend API for the INC Robotics website, handling contact forms and email notifications.

## Features

- 📧 Gallery tour request handling
- 📝 General contact form processing
- 🔒 Rate limiting and security
- 📱 Professional email templates
- 🌐 CORS enabled for frontend integration

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Recipient Email
RECIPIENT_EMAIL=Ahmed.bashir@incrobotics.com
```

### 3. Gmail Setup (for testing)

To use Gmail for sending emails:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS` (not your regular Gmail password)

### 4. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Gallery Tour Request
```
POST /api/contact/gallery-tour
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+966501234567",
  "company": "ABC Company",
  "preferredDate": "2024-01-15",
  "preferredTime": "14:00",
  "message": "Interested in seeing your robotics solutions"
}
```

### General Contact
```
POST /api/contact/general
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "I would like to discuss a potential partnership"
}
```

## Email Templates

The API sends beautifully formatted HTML emails with:
- Professional INC Robotics branding
- All form data clearly organized
- Responsive design
- Both HTML and text versions

## Security Features

- **Rate Limiting**: 10 requests per 15 minutes per IP
- **CORS Protection**: Configured for specific frontend URL
- **Input Validation**: Email format and required field validation
- **Helmet**: Security headers
- **Error Handling**: Comprehensive error management

## Production Deployment

For production, consider using:
- **SendGrid** or **Mailgun** for reliable email delivery
- **PM2** for process management
- **Nginx** as reverse proxy
- **SSL/HTTPS** for secure communication

## Testing

Test the API using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/contact/gallery-tour \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+966501234567",
    "company": "Test Company",
    "preferredDate": "2024-01-15",
    "preferredTime": "14:00",
    "message": "This is a test message"
  }'
```

## Troubleshooting

### Email Not Sending
1. Check Gmail credentials in `.env`
2. Ensure 2FA is enabled and app password is used
3. Check server logs for error messages
4. Verify recipient email address

### CORS Issues
1. Update `FRONTEND_URL` in `.env`
2. Ensure frontend is running on the specified URL
3. Check browser console for CORS errors

### Rate Limiting
- Default: 10 requests per 15 minutes per IP
- Adjust in `server.js` if needed
- Consider different limits for different endpoints
