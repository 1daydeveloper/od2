export const metadata = {
  title: "Free Email Sending Test Service & Templates | One Day Developers",
  description: "Test your email deliverability with our free email templates and upcoming sending service. Copy HTML, CSS, and Plain Text templates for testing absolutely free.",
  keywords: "free email test service, email templates, test email content, html email preview, spam filter test, otp email template, transactional email test",
  openGraph: {
    title: "Free Email Sending Test Service & Templates | One Day Developers",
    description: "Production-ready email templates for developers. Test OTP, Transactional, and Marketing emails for free.",
    url: "https://www.od2.in/test-mail",
    siteName: "One Day Developers",
    images: [
      {
        url: "/odd.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Email Sending Test Service & Templates | One Day Developers",
    description: "Production-ready email templates for developers. Test OTP, Transactional, and Marketing emails for free.",
    images: ["/odd.png"],
  },
};

export default function TestMailLayout({ children }) {
  return <>{children}</>;
}