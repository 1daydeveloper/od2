"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { SEOContent } from "./SEOContent";

export default function CaptchaV3Page() {
  const [siteKey, setSiteKey] = useState("");
  const [responseToken, setResponseToken] = useState("");
  const [status, setStatus] = useState("");
  const [widgetLoaded, setWidgetLoaded] = useState(false);

  const recaptchaStatusRef = useRef(null);

  // Load reCAPTCHA script when siteKey is set
  React.useEffect(() => {
    if (!siteKey || widgetLoaded) return;
    window.recaptchaV3Ready = function () {
      setWidgetLoaded(true);
    };
    if (!window.grecaptcha) {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      s.async = true;
      s.defer = true;
      s.onload = () => {
        setWidgetLoaded(true);
      };
      document.body.appendChild(s);
    } else {
      setWidgetLoaded(true);
    }
    // eslint-disable-next-line
  }, [siteKey]);

  const handleReset = (e) => {
    e.preventDefault();
    setSiteKey("");
    setResponseToken("");
    setStatus("");
    setWidgetLoaded(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!", { autoClose: 1200 });
    });
  };

  const handleGenerateToken = async (e) => {
    e.preventDefault();
    setStatus("Generating token...");
    if (window.grecaptcha && siteKey) {
      window.grecaptcha.ready(function () {
        window.grecaptcha
          .execute(siteKey, { action: "submit" })
          .then(function (token) {
            if (token) {
              setResponseToken(token);
              setStatus("Token generated.");
            } else {
              setStatus("Failed to generate token.");
              toast.error("Failed to generate reCAPTCHA token.");
            }
          })
          .catch(function () {
            setStatus("Failed to generate token.");
            toast.error("Failed to generate reCAPTCHA token.");
          });
      });
    } else {
      setStatus("reCAPTCHA not loaded.");
      toast.error("reCAPTCHA not loaded.");
    }
  };

  return (
    <section className="py-12 rounded-lg">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Test Google reCAPTCHA v3
        </h1>
        <p className="mb-6 text-center">
          Enter your <b>Site Key</b> to generate a test response token for API
          testing.
        </p>
        <form
          className="mb-6"
          id="recaptcha-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="block mb-2 font-semibold">Site Key</label>
          <input
            type="text"
            name="sitekey"
            className="w-full px-4 py-2 rounded mb-4 border-2 border-current"
            placeholder="Enter your reCAPTCHA v3 site key"
            value={siteKey}
            onChange={(e) => {
              setSiteKey(e.target.value);
              setResponseToken("");
              setStatus("");
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
              onClick={handleGenerateToken}
              disabled={!siteKey}
            >
              Load reCAPTCHA / Generate New response
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
        {status && (
          <div className="text-xs mb-2" ref={recaptchaStatusRef}>
            {status}
          </div>
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
