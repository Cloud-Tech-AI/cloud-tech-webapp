import type { NextApiRequest, NextApiResponse } from 'next'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  type: 'general' | 'speaking' | 'collaboration' | 'support'
  company?: string
  phone?: string
}

interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { name, email, subject, message, type, company, phone }: ContactFormData = req.body

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      })
    }

    // Spam detection (basic)
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations']
    const messageContent = `${subject} ${message}`.toLowerCase()
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword))

    if (hasSpam) {
      return res.status(400).json({
        success: false,
        message: 'Message flagged as potential spam'
      })
    }

    // Rate limiting (basic - in production, use Redis or similar)
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    
    const contactRecord = {
      name,
      email,
      subject,
      message,
      type: type || 'general',
      company: company || '',
      phone: phone || '',
      submittedAt: new Date().toISOString(),
      ipAddress: clientIP,
      userAgent: req.headers['user-agent'],
      status: 'new'
    }

    // Send notification email to admin
    if (process.env.SENDGRID_API_KEY) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ 
                email: process.env.ADMIN_EMAIL || 'admin@cloudtech.com',
                name: 'Cloud Tech Admin'
              }],
              subject: `New Contact Form Submission: ${subject}`,
            }],
            from: {
              email: process.env.FROM_EMAIL || 'noreply@cloudtech.com',
              name: 'Cloud Tech Website'
            },
            content: [{
              type: 'text/html',
              value: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
                <hr>
                <p><small>
                  Submitted: ${contactRecord.submittedAt}<br>
                  IP: ${clientIP}<br>
                  User Agent: ${req.headers['user-agent']}
                </small></p>
              `
            }]
          }),
        })
      } catch (error) {
        console.error('Admin notification email error:', error)
      }
    }

    // Send auto-reply to user
    if (process.env.SENDGRID_API_KEY) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email, name }],
              subject: 'Thank you for contacting Cloud Tech Community',
            }],
            from: {
              email: process.env.FROM_EMAIL || 'hello@cloudtech.com',
              name: 'Cloud Tech Community'
            },
            content: [{
              type: 'text/html',
              value: `
                <h2>Thank you for reaching out!</h2>
                <p>Hi ${name},</p>
                <p>Thank you for contacting the Cloud Tech Community. We've received your message and will get back to you within 24-48 hours.</p>
                
                <h3>Your Message Summary:</h3>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Type:</strong> ${type}</p>
                
                <p>In the meantime, feel free to:</p>
                <ul>
                  <li>Check out our latest <a href="${process.env.NEXT_PUBLIC_SITE_URL}/blog">blog posts</a></li>
                  <li>Listen to our <a href="${process.env.NEXT_PUBLIC_SITE_URL}/podcast">podcast episodes</a></li>
                  <li>Follow us on social media for updates</li>
                </ul>
                
                <p>Best regards,<br>
                The Cloud Tech Team</p>
                
                <hr>
                <p><small>This is an automated response. Please do not reply to this email.</small></p>
              `
            }]
          }),
        })
      } catch (error) {
        console.error('Auto-reply email error:', error)
      }
    }

    // Save to database (example - replace with your actual database logic)
    console.log('New contact form submission:', contactRecord)

    // Send to Slack/Discord webhook (optional)
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: `New contact form submission from ${name} (${email})`,
            attachments: [{
              color: 'good',
              fields: [
                { title: 'Type', value: type, short: true },
                { title: 'Subject', value: subject, short: true },
                { title: 'Company', value: company || 'Not provided', short: true },
                { title: 'Phone', value: phone || 'Not provided', short: true },
                { title: 'Message', value: message.substring(0, 200) + (message.length > 200 ? '...' : ''), short: false }
              ]
            }]
          }),
        })
      } catch (error) {
        console.error('Slack notification error:', error)
      }
    }

    res.status(200).json({
      success: true,
      message: 'Thank you for your message! We\'ll get back to you soon.',
      data: {
        submittedAt: contactRecord.submittedAt,
        type: contactRecord.type
      }
    })

  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
}
