---
title: "How to Test and Verify Google reCAPTCHA v3"
date: "2025-05-23"
author: "One Day Developers(OD2)"
authorLink: "https://www.linkedin.com/in/od2/"
category: "Web Development"
description: "A practical guide to testing and verifying Google reCAPTCHA v3 tokens for your web applications."
keywords: "Google reCAPTCHA v3, test, verify, API, site key, secret, web development, security"
urlpath: "test-google-recaptcha-v3"
---

Google reCAPTCHA v3 offers frictionless bot detection for your web applications by returning a score based on user interactions. Unlike v2, v3 does not require user interaction with a widget, making it seamless for users.

In this article, you'll learn how to test and verify reCAPTCHA v3 tokens using test credentials and how to integrate it into your workflow.

## What is Google reCAPTCHA v3?

reCAPTCHA v3 works in the background to analyze user behavior and returns a score (0.0–1.0) indicating the likelihood that the request is legitimate. You can use this score to take appropriate actions in your application.

## Test Credentials

Google provides test keys for development:

- **Test Site Key:** `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
- **Test Secret:** `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

These keys always return a score of 0.9 and should only be used for testing.

## How to Integrate reCAPTCHA v3

### 1. Add the reCAPTCHA v3 Script

Include the following script in your HTML, replacing `SITE_KEY` with your site key:

```html
<script src="https://www.google.com/recaptcha/api.js?render=SITE_KEY"></script>
```

### 2. Generate a Token

Call `grecaptcha.execute` to generate a token for a specific action:

```javascript
grecaptcha.ready(function() {
  grecaptcha.execute('SITE_KEY', {action: 'homepage'}).then(function(token) {
    // Send token to your backend for verification
    console.log(token);
  });
});
```

### 3. Verify the Token on the Server

Send the token to your backend and verify it with the secret key:

```javascript
// Example using fetch in Node.js or browser
async function verifyCaptchaV3(secret, token) {
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
  });
  return await res.json();
}
```

The response will include a `score` and `action`. For test keys, the score is always 0.9.

### 4. Example: Testing with Test Credentials

You can use the test site key and secret to generate and verify tokens during development. The process is similar to v2, but without a visible widget.

#### Steps:

1. Add the script with the test site key.
2. Call `grecaptcha.execute` for your action.
3. Copy the generated token.
4. Verify the token using the test secret and the `/siteverify` API.

### Example Verification Response

```json
{
  "success": true,
  "score": 0.9,
  "action": "homepage",
  "challenge_ts": "2025-01-03T12:34:56Z",
  "hostname": "localhost"
}
```

## Conclusion

Google reCAPTCHA v3 provides a seamless way to protect your site from bots without user friction. By using the test credentials, you can safely develop and test your integration before going live.

- Use the test keys for development only.
- Always verify the token server-side.
- Adjust your application's logic based on the returned score.

For more details, visit the [official reCAPTCHA documentation](https://developers.google.com/recaptcha/docs/v3).

---
