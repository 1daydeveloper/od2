export const EMAIL_TEMPLATES = [
  {
    id: 'plain-text',
    title: 'Plain Text (Normal)',
    subject: 'Welcome to Our Service!',
    description: 'A simple plain text email without any formatting or HTML.',
    type: 'text/plain',
    content: `Hi there,

Thank you for joining our platform. We're excited to have you on board!

Best regards,
The Team`,
  },
  {
    id: 'html-only',
    title: 'HTML Only',
    subject: 'Welcome to Our Service!',
    description: 'Basic HTML email with standard tags and no external styling.',
    type: 'text/html',
    content: `<html>
  <body>
    <h1>Welcome to Our Service!</h1>
    <p>Hi there,</p>
    <p>Thank you for joining our platform. We're <strong>excited</strong> to have you on board!</p>
    <p>Best regards,<br>The Team</p>
  </body>
</html>`,
  },
  {
    id: 'html-inline-css',
    title: 'HTML + Inline CSS',
    subject: 'Welcome to Our Service!',
    description: 'HTML email with inline CSS for better styling across different email clients.',
    type: 'text/html',
    content: `<html>
  <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
      <h1 style="color: #007bff;">Welcome to Our Service!</h1>
      <p>Hi there,</p>
      <p>Thank you for joining our platform. We're <span style="font-weight: bold; color: #28a745;">excited</span> to have you on board!</p>
      <a href="#" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-top: 10px;">Get Started</a>
      <p style="margin-top: 20px; font-size: 0.9em; color: #777;">Best regards,<br>The Team</p>
    </div>
  </body>
</html>`,
  },
  {
    id: 'html-css-js',
    title: 'HTML + CSS + JavaScript',
    subject: 'Interactive Email Test',
    description: 'HTML email that includes JavaScript. Note: JavaScript is blocked in most email clients.',
    type: 'text/html',
    note: 'JavaScript is blocked in most email clients for security reasons.',
    content: `<html>
  <head>
    <style>
      .btn { padding: 10px 20px; background: #dc3545; color: white; border: none; cursor: pointer; }
    </style>
  </head>
  <body>
    <h1>Interactive Email Test</h1>
    <p>Click the button below to trigger a JS alert (if supported):</p>
    <button class="btn" onclick="alert('JavaScript in Email!')">Click Me</button>
    <script>
      console.log('Script loaded');
    </script>
  </body>
</html>`,
  },
  {
    id: 'otp-email',
    title: 'OTP / Verification Email',
    subject: 'Your Verification Code: 123456',
    description: 'Standard account verification or password reset email with an OTP code.',
    type: 'text/html',
    content: `<html>
  <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; padding: 40px 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
      <tr>
        <td style="padding: 40px; text-align: center;">
          <h2 style="color: #333; margin-bottom: 20px;">Verify Your Email</h2>
          <p style="color: #666; font-size: 16px;">Use the code below to complete your sign-up process. This code will expire in 10 minutes.</p>
          <div style="background-color: #f8f9fa; padding: 20px; margin: 30px 0; border-radius: 8px;">
            <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #007bff;">123456</span>
          </div>
          <p style="color: #999; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  },
  {
    id: 'transactional-email',
    title: 'Transactional Email',
    subject: 'Order Confirmation #OD2-98765',
    description: 'Receipt or order confirmation email with item details.',
    type: 'text/html',
    content: `<html>
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; border: 1px solid #eee;">
      <h2 style="border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Order Confirmation #OD2-98765</h2>
      <p>Thank you for your purchase!</p>
      <table width="100%" style="border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="border-bottom: 1px solid #eee;">
            <th align="left" style="padding: 10px;">Item</th>
            <th align="right" style="padding: 10px;">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 10px;">Premium Subscription</td>
            <td align="right" style="padding: 10px;">$29.00</td>
          </tr>
          <tr>
            <td style="padding: 10px;">Service Fee</td>
            <td align="right" style="padding: 10px;">$1.00</td>
          </tr>
        </tbody>
        <tfoot>
          <tr style="font-weight: bold; border-top: 2px solid #f0f0f0;">
            <td style="padding: 10px;">Total</td>
            <td align="right" style="padding: 10px;">$30.00</td>
          </tr>
        </tfoot>
      </table>
      <p>Expected delivery: Instant</p>
    </div>
  </body>
</html>`,
  },
  {
    id: 'promotional-email',
    title: 'Promotional / Marketing Email',
    subject: 'FLASH SALE: Up to 50% OFF!',
    description: 'Visually rich marketing email with images and multiple CTAs.',
    type: 'text/html',
    content: `<html>
  <body style="margin: 0; padding: 0; background-color: #000; color: #fff; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #111;">
      <tr>
        <td align="center" style="padding: 50px 20px;">
          <h1 style="font-size: 48px; margin: 0; color: #ffd700;">FLASH SALE!</h1>
          <p style="font-size: 20px; color: #ccc;">Up to 50% OFF on all OD2 Services</p>
          <div style="margin: 40px 0;">
            <img src="https://www.od2.in/odd.png" alt="Promo Image" style="max-width: 100%; height: auto; border-radius: 10px; border: 2px solid #ffd700;">
          </div>
          <a href="#" style="background-color: #ffd700; color: #000; padding: 15px 35px; text-decoration: none; font-weight: bold; border-radius: 50px; font-size: 18px;">SHOP NOW</a>
          <p style="margin-top: 30px; font-size: 12px; color: #666;">*Offer valid until tomorrow. Terms and conditions apply.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  },
  {
    id: 'spam-email',
    title: 'Spam / Phishing Simulation',
    subject: 'URGENT: Your account has been suspended!',
    description: 'A template designed to look like a suspicious spam or phishing email for testing filters.',
    type: 'text/html',
    note: 'Use this to test your span filters and security training programs.',
    content: `<html>
  <body style="font-family: 'Times New Roman', serif; background-color: #ffffff; padding: 20px;">
    <div style="color: #ff0000; font-weight: bold; font-size: 24px;">SECURITY ALERT!</div>
    <p>Dear Customer,</p>
    <p>Your account access has been limited due to suspicious activity from an unknown IP address (192.168.1.1). To restore your account, you must verify your identity immediately.</p>
    <p>Failure to do so within 24 hours will lead to permanent account deletion.</p>
    <a href="http://suspicious-link.test/verify" style="color: #0000ff; text-decoration: underline; font-size: 18px;">CLICK HERE TO VERIFY NOW</a>
    <p>Thank you,<br>The Security Department</p>
    <hr>
    <p style="font-size: 10px; color: #888;">This is an automated message. Do not reply.</p>
  </body>
</html>`,
  },
  {
    id: 'newsletter-email',
    title: 'Weekly Newsletter',
    subject: 'The OD2 Weekly: New Tools, Tips & Rapid Tech',
    description: 'A clean newsletter template with multiple sections and articles.',
    type: 'text/html',
    content: `<html>
  <body style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f2f5; margin: 0; padding: 20px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e1e4e8;">
      <tr>
        <td style="background-color: #007bff; padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Weekly Tech Insights</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 30px;">
          <h2 style="color: #333;">What's New This Week</h2>
          <p style="color: #555;">We've launched three new developer tools and optimized our delivery pipeline for even faster 24-hour results.</p>
          <div style="border-left: 4px solid #007bff; padding: 10px 20px; margin: 20px 0; background: #f8f9fa;">
            <p style="margin: 0; font-weight: bold;">"The future of coding is agentic." - OD2 Team</p>
          </div>
          <p style="color: #555;">Check out our latest blog posts for tips on integrating Next.js with agentic workflows.</p>
          <a href="https://www.od2.in/blog" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 500;">Read More</a>
        </td>
      </tr>
      <tr>
        <td style="background: #f8f9fa; padding: 20px; text-align: center; color: #888; font-size: 12px;">
          &copy; 2026 One Day Developers. All rights reserved.<br>
          <a href="#" style="color: #888;">Unsubscribe</a> from this list.
        </td>
      </tr>
    </table>
  </body>
</html>`,
  },
  {
    id: 'multipart-email',
    title: 'Multipart (Text + HTML)',
    subject: 'Welcome to Our Service!',
    description: 'An email containing both text and HTML parts (Informational).',
    type: 'multipart/alternative',
    note: 'This template illustrates the structure of a multi-part email. In actual MIME messages, these are separated by boundaries.',
    content: `--- Boundary ---
Content-Type: text/plain; charset=utf-8

Welcome to Our Service!
Thank you for joining our platform. We're excited to have you on board!

--- Boundary ---
Content-Type: text/html; charset=utf-8

<html>
  <body>
    <h1>Welcome to Our Service!</h1>
    <p>Thank you for joining our platform. We're excited to have you on board!</p>
  </body>
</html>
--- Boundary ---`,
  },
];
