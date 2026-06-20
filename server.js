import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { body, validationResult } from 'express-validator'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from client/dist in production
const distPath = path.join(__dirname, 'client', 'dist')
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
}

// Store submissions in memory (in production, use a database)
let submissions = []

// Configure email transporter
let transporter = null

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
} else if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
  // Google App Password setup (recommended for Gmail)
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })
}

// Contact form submission endpoint
app.post(
  '/api/contact',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('subject').trim().isLength({ min: 1 }).withMessage('Subject is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  async (req, res) => {
    // Validate input
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg })
    }

    const { name, email, subject, message } = req.body

    try {
      // Store submission
      const submission = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        createdAt: new Date().toISOString(),
      }

      submissions.push(submission)
      console.log(`[${new Date().toISOString()}] New contact submission from ${email}`)

      // Send notification email to admin
      if (transporter) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_USER || process.env.GMAIL_USER,
            to: process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
            subject: `New Stonex Contact: ${subject}`,
            html: `
              <h2>New Contact Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <hr>
              <p style="color: #666; font-size: 12px;">Sent at ${new Date().toLocaleString()}</p>
            `,
          })

          // Send confirmation email to user
          await transporter.sendMail({
            from: process.env.SMTP_USER || process.env.GMAIL_USER,
            to: email,
            subject: 'We received your message — Stonex',
            html: `
              <h2>Thanks for reaching out!</h2>
              <p>Hi ${name},</p>
              <p>We received your message and will get back to you as soon as possible.</p>
              <p style="color: #666; margin-top: 20px; font-size: 12px;">
                If you don't hear from us within 24 hours, please check your spam folder or reach out again.
              </p>
            `,
          })

          console.log(`Email sent to admin and confirmation sent to ${email}`)
        } catch (emailError) {
          console.error('Error sending email:', emailError.message)
          // Don't fail the submission just because email failed
        }
      } else {
        console.log('Email service not configured. Configure SMTP or Gmail settings to enable email notifications.')
      }

      return res.json({
        success: true,
        message: 'Message sent successfully!',
        id: submission.id,
      })
    } catch (error) {
      console.error('Contact form error:', error)
      return res.status(500).json({
        error: 'Something went wrong. Please try again later.',
      })
    }
  }
)

// Admin endpoint to view submissions (protected in production)
app.get('/api/submissions', (req, res) => {
  // In production, add authentication here
  if (process.env.NODE_ENV === 'production' && !req.headers['authorization']) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  res.json({
    count: submissions.length,
    submissions: submissions.sort((a, b) => b.id - a.id),
  })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    emailConfigured: !!transporter,
    submissionsCount: submissions.length,
  })
})

// Catch-all for SPA routing in production
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html')
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Stonex server running on http://localhost:${PORT}

Email service: ${transporter ? '✓ Configured' : '✗ Not configured (see .env.example)'}
Submissions stored in memory (for development)

In production:
- Add a database (PostgreSQL, MongoDB, etc.)
- Set up proper authentication for /api/submissions
- Enable HTTPS
  `)
})
