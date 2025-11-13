---
title: "How to Test and Verify Google reCAPTCHA v2"
date: "2025-05-23"
author: "One Day Developers(OD2)"
authorLink: "https://www.linkedin.com/in/od2/"
category: "Web Development"
description: "A practical guide to testing and verifying Google reCAPTCHA v2 tokens for your web applications."
keywords: "Google reCAPTCHA v2, test, verify, API, site key, secret, web development, security"
urlpath: "test-google-recaptcha-v2"
---

Google reCAPTCHA v2 is a popular solution to protect your website from bots and spam. It requires users to complete a challenge (like "I'm not a robot" checkbox) to prove they are human.

In this article, you'll learn how to test and verify reCAPTCHA v2 tokens using test credentials and how to integrate it into your workflow.

## What is Google reCAPTCHA v2?

reCAPTCHA v2 presents a widget to users, who must check a box or solve a challenge. When completed, it generates a response token that you can verify on your backend.

## Test Credentials

Google provides test keys for development:

- **Test Site Key:** `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Test Secret:** `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

These keys always pass verification and should only be used for testing.

## How to Integrate reCAPTCHA v2

### 1. Add the reCAPTCHA v2 Widget

Include the following script in your HTML, replacing `SITE_KEY` with your site key:

```html
<script src="https://www.google.com/recaptcha/api.js" async defer></script>
<div class="g-recaptcha" data-sitekey="SITE_KEY"></div>
```

### 2. Get the Response Token

When the user completes the challenge, a response token is generated and submitted with your form. On the client side, you can access it via:

```javascript
const response = grecaptcha.getResponse();
```

### 3. Verify the Token on the Server

Send the token to your backend and verify it with the secret key:

```javascript
// Example using fetch in Node.js or browser
async function verifyCaptchaV2(secret, response) {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(response)}`,
  });
  return await res.json();
}
```

The response will indicate whether the verification succeeded.

### 4. Example: Testing with Test Credentials

You can use the test site key and secret to generate and verify tokens during development. The process is:

1. Add the widget with the test site key.
2. Complete the challenge to generate a token.
3. Copy the generated token.
4. Verify the token using the test secret and the `/siteverify` API.

### Example Verification Response

```json
{
  "success": true,
  "challenge_ts": "2025-01-02T12:34:56Z",
  "hostname": "localhost"
}
```

## Conclusion

Google reCAPTCHA v2 is easy to test and integrate using the provided test credentials. Always verify the token server-side for security.

- Use the test keys for development only.
- Never expose your secret key in client-side code.
- For production, use your own site key and secret.

For more details, visit the [official reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/display).

---

