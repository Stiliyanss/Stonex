# Stonex Contact Form Setup - Node.js/Express Backend

The contact form uses a Node.js/Express backend with email notifications via nodemailer.

## Quick Start

### 1. Install Dependencies

```bash
# Install server dependencies
npm install

# Install client dependencies  
cd client && npm install && cd ..
```

### 2. Configure Email

Copy `.env.example` to `.env` and choose ONE email method:

```bash
cp .env.example .env
```

Then edit `.env` and configure your email:

#### Option A: Gmail with App Password (Recommended)

**Why?** Free, no setup needed, secure

**Steps:**
1. Enable 2-factor authentication on your Gmail account
2. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Select Mail and Windows (or your device)
4. Google generates a 16-character password
5. Copy it to `.env`:

```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=xxxx xxxx xxxx xxxx
ADMIN_EMAIL=your-email@gmail.com
```

#### Option B: Custom SMTP (SendGrid, Mailgun, etc.)

If using a third-party service, uncomment and fill in:

```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxx
ADMIN_EMAIL=your-email@example.com
```

### 3. Run Locally

```bash
# Run both server and client
npm run dev

# Or run separately:
npm run server          # Terminal 1: starts on http://localhost:3001
cd client && npm run dev # Terminal 2: starts on http://localhost:5173
```

### 4. Test

1. Open http://localhost:5173
2. Go to the contact form
3. Submit a test message
4. You should receive:
   - Admin notification at `ADMIN_EMAIL`
   - Confirmation email to the visitor's email

## How It Works

```
Browser (React)
    ↓ POST /api/contact
Node.js/Express Server
    ↓ validates input
    ↓ sends admin email
    ↓ sends confirmation email
    ↓
Gmail/SMTP
```

### Admin Panel

View all submissions at `http://localhost:3001/api/submissions` (development only)

## Production Deployment

### Deploying to Vercel/Netlify with Express

These platforms don't directly support Express. Instead, use:

**Option 1: Render.com (Recommended)**
- Free tier available
- Built for Node.js apps
- Steps:
  1. Push code to GitHub
  2. Connect repo at render.com
  3. Set environment variables in Render dashboard
  4. Deploy

**Option 2: Railway**
- Similar to Render
- https://railway.app

**Option 3: Fly.io**
- Container-based deployment
- https://fly.io

**Option 4: Heroku Alternative (Koyeb)**
- Free tier
- https://koyeb.com

### Environment Variables in Production

Add to your hosting provider's environment settings:
- `GMAIL_USER` (or `SMTP_*` variables)
- `GMAIL_PASS` (or `SMTP_PASS`)
- `ADMIN_EMAIL`
- `NODE_ENV=production`

### Separate Frontend & Backend

For maximum flexibility, you can deploy frontend and backend separately:

**Frontend (React):** Vercel, Netlify, GitHub Pages
**Backend (Express):** Render, Railway, Fly.io

Update your React app's API URL to your backend:

```javascript
// In your fetch calls
fetch('https://your-api.render.com/api/contact', {...})
```

## Storing Submissions

Currently, submissions are stored in memory (lost on server restart). For production:

### Option 1: Add PostgreSQL/MongoDB

```bash
npm install mongoose
# or
npm install pg
```

Then update `server.js` to use a database.

### Option 2: Use Third-Party Service

- Airtable
- Google Sheets
- Firebase

### Example: Airtable Integration

```bash
npm install airtable
```

Then in `server.js`:

```javascript
import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_KEY }).base(process.env.AIRTABLE_BASE)

// In your contact endpoint:
await base('Submissions').create({
  fields: {
    Name: name,
    Email: email,
    Subject: subject,
    Message: message,
  }
})
```

## Troubleshooting

**"Sending..." button is stuck**
- Check browser console (F12) for errors
- Check server logs for validation errors

**No email sent**
- Verify `.env` file has correct credentials
- Gmail: Check that App Password is exactly 16 characters (no spaces in your config)
- SMTP: Test credentials on https://mailtrap.io

**"ECONNREFUSED" error**
- Server isn't running
- Run `npm run server` to start it

**Submissions not working in production**
- Check environment variables are set in your hosting platform
- Verify email service is configured

## Development Tips

### View Recent Submissions

```bash
curl http://localhost:3001/api/submissions
```

### Check Server Health

```bash
curl http://localhost:3001/api/health
```

### Clear Submissions (Development)

Submissions are in memory, so just restart the server:

```bash
# Press Ctrl+C to stop, then
npm run server
```

## Security Considerations

1. **Validation:** Input is validated with express-validator
2. **CORS:** Configured to allow requests from localhost (update for production)
3. **Rate Limiting:** Add for production (`npm install express-rate-limit`)
4. **Env Secrets:** Never commit `.env` file (it's in `.gitignore`)

### Add Rate Limiting (Production)

```javascript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // 5 requests per window
})

app.post('/api/contact', limiter, [...])
```

## Support

For issues:
1. Check the error message in browser console
2. Check server logs
3. Verify `.env` file configuration
4. Test email credentials independently
