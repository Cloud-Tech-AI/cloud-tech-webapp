import type { NextApiRequest, NextApiResponse } from 'next'

interface SubscriptionData {
  email: string
  firstName?: string
  interests?: string[]
  source?: string
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
    const { email, firstName, interests, source }: SubscriptionData = req.body

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required'
      })
    }

    // Here you would typically:
    // 1. Save to your database
    // 2. Send to email service provider
    // 3. Send welcome email
    // 4. Track analytics

    // Example: Save to database (replace with your actual database logic)
    const subscriptionRecord = {
      email,
      firstName: firstName || '',
      interests: interests || [],
      source: source || 'website',
      subscribedAt: new Date().toISOString(),
      status: 'active',
      ipAddress: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent']
    }

    // Example: Send to ConvertKit
    if (process.env.CONVERTKIT_API_SECRET) {
      try {
        const convertKitResponse = await fetch(
          `https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              api_secret: process.env.CONVERTKIT_API_SECRET,
              email,
              first_name: firstName,
              tags: interests,
            }),
          }
        )

        if (!convertKitResponse.ok) {
          console.error('ConvertKit API error:', await convertKitResponse.text())
        }
      } catch (error) {
        console.error('ConvertKit integration error:', error)
      }
    }

    // Example: Send to Mailchimp
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      try {
        const mailchimpResponse = await fetch(
          `https://${process.env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
            },
            body: JSON.stringify({
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                FNAME: firstName || '',
                INTERESTS: interests?.join(', ') || '',
              },
              tags: interests || [],
            }),
          }
        )

        if (!mailchimpResponse.ok) {
          console.error('Mailchimp API error:', await mailchimpResponse.text())
        }
      } catch (error) {
        console.error('Mailchimp integration error:', error)
      }
    }

    // Send welcome email (example with SendGrid)
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
              to: [{ email, name: firstName }],
              dynamic_template_data: {
                firstName: firstName || 'there',
                interests: interests || [],
              }
            }],
            from: {
              email: process.env.FROM_EMAIL || 'hello@cloudtech.com',
              name: 'Cloud Tech Community'
            },
            template_id: process.env.WELCOME_EMAIL_TEMPLATE_ID,
          }),
        })
      } catch (error) {
        console.error('Welcome email error:', error)
      }
    }

    // Log successful subscription
    console.log('New subscription:', subscriptionRecord)

    res.status(200).json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      data: {
        email,
        subscribedAt: subscriptionRecord.subscribedAt
      }
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    })
  }
}
