"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { SEOContent } from "./SEOContent";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const TEST_SECRET = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";

async function verifyCaptcha(secret, response) {
  if (!secret || !response) return null;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(
        response
      )}`,
    });
    return await res.json();
  } catch {
    return null;
  }
}

export default function CaptchaV2Page() {
  const [siteKey, setSiteKey] = useState("");
  const [showTestCreds, setShowTestCreds] = useState(false);
  const [responseToken, setResponseToken] = useState("");
  const recaptchaWidgetRef = useRef(null);
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  // Load reCAPTCHA widget when siteKey is set
  React.useEffect(() => {
    if (!siteKey || widgetLoaded) return;
    window.onloadCallback = function () {
      if (window.grecaptcha && recaptchaWidgetRef.current) {
        window.grecaptcha.render(recaptchaWidgetRef.current, {
          sitekey: siteKey,
          callback: function (token) {
            setResponseToken(token);
          },
        });
      }
    };
    if (!window.grecaptcha) {
      const s = document.createElement("script");
      s.src =
        "https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit";
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
      setWidgetLoaded(true);
    } else {
      window.onloadCallback();
      setWidgetLoaded(true);
    }
    // eslint-disable-next-line
  }, [siteKey]);

  const handleFillTest = (e) => {
    e.preventDefault();
    setSiteKey(TEST_SITE_KEY);
    setShowTestCreds(true);
    setResponseToken("");
    setWidgetLoaded(false);
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSiteKey("");
    setShowTestCreds(false);
    setResponseToken("");
    setWidgetLoaded(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", { autoClose: 1200 });
    });
  };

  return (
    <section className="py-12 rounded-lg">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Test Google reCAPTCHA v2
        </h1>
        <p className="mb-6 text-center">
          Enter your <b>Site Key</b> to generate and verify a test response
          token for API testing.
        </p>
        <form
          className="mb-6"
          id="recaptcha-form"
          onSubmit={(e) => {
            e.preventDefault();
            setWidgetLoaded(false);
          }}
        >
          <label className="block mb-2 font-semibold">Site Key</label>
          <input
            type="text"
            name="sitekey"
            className="w-full px-4 py-2 rounded mb-4 border-2 border-current"
            placeholder="Enter your reCAPTCHA v2 site key"
            value={siteKey}
            onChange={(e) => {
              setSiteKey(e.target.value);
              setShowTestCreds(false);
              setResponseToken("");
              setWidgetLoaded(false);
            }}
            required
            id="sitekey-input"
            autoComplete="off"
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="px-6 py-2 rounded font-semibold"
              onClick={() => setWidgetLoaded(false)}
              disabled={!siteKey}
            >
              Load reCAPTCHA / Generate New response
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded font-semibold"
              id="fill-test-btn"
              onClick={handleFillTest}
            >
              Fill Test Credentials
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded font-semibold"
              id="reset-btn"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded font-semibold"
              id="register-site-btn"
              onClick={() =>
                window.open(
                  "https://www.google.com/recaptcha/admin/create",
                  "_blank",
                  "noopener"
                )
              }
            >
              Register New Site
            </button>
          </div>
        </form>
        {showTestCreds && (
          <div className="mb-4 p-4 rounded">
            <div className="mb-2 font-semibold flex items-center gap-2">
              Test Site Key: <code>{TEST_SITE_KEY}</code>
              <button
                type="button"
                className="px-2 py-1 rounded text-xs"
                onClick={() => handleCopy(TEST_SITE_KEY)}
                title="Copy Site Key"
              >
                Copy
              </button>
            </div>
            <div className="mb-2 font-semibold flex items-center gap-2">
              Test Secret: <code>{TEST_SECRET}</code>
              <button
                type="button"
                className="px-2 py-1 rounded text-xs"
                onClick={() => handleCopy(TEST_SECRET)}
                title="Copy Secret"
              >
                Copy
              </button>
            </div>
          </div>
        )}
        {siteKey && (
          <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
            <div
              className="mb-6 flex justify-center"
              id="recaptcha-container"
              suppressHydrationWarning
            >
              {/* reCAPTCHA widget rendered client-side */}
              <div id="recaptcha-widget" ref={recaptchaWidgetRef} />
            </div>
          </form>
        )}
        {responseToken && (
          <div className="p-4 rounded mb-4">
            <div className="font-semibold mb-2 flex items-center gap-2">
              Generated Response Token:{" "}
              <button
                type="button"
                className="px-2 py-1 rounded text-xs"
                id="copy-response-btn"
                title="Copy to clipboard"
                onClick={() => handleCopy(responseToken)}
              >
                Copy
              </button>
            </div>
            <div className="flex items-center gap-2">
              <code className="break-all">{responseToken}</code>
            </div>
            <div className="mt-2 text-sm">
              Use this token as <b>response</b> in your API call to{" "}
              <code>https://www.google.com/recaptcha/api/siteverify</code> with
              your secret.
            </div>
          </div>
        )}
        <div className="text-xs mt-8 text-center">
          For testing purposes only. No data is stored.
        </div>

        <SEOContent />
      </div>
    </section>
  );
}
