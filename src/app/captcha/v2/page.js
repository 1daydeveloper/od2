"use client";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { SEOContent } from "./SEOContent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { TypographyH1, TypographyP, TypographySmall } from "@/components/ui/typography";

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
    <section className="py-6 px-2 sm:py-12 sm:px-0 rounded-lg">
      <div className="mx-auto w-full max-w-4xl">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              <TypographyH1 className="text-3xl mb-4 text-center">
                Test Google reCAPTCHA v2
              </TypographyH1>
            </CardTitle>
            <TypographyP className="mb-6 text-center">
              Enter your <b>Site Key</b> to generate and verify a test response
              token for API testing.
            </TypographyP>
          </CardHeader>
          <CardContent>
            <form
              className="mb-6"
              id="recaptcha-form"
              onSubmit={(e) => {
                e.preventDefault();
                setWidgetLoaded(false);
              }}
            >
              <Label htmlFor="sitekey-input" className="block mb-2 font-semibold">
                Site Key
              </Label>
              <Input
                type="text"
                name="sitekey"
                className="mb-4 w-full"
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
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  variant="default"
                  onClick={() => setWidgetLoaded(false)}
                  disabled={!siteKey}
                  className="w-full sm:w-auto"
                >
                  Generate New response
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  id="fill-test-btn"
                  onClick={handleFillTest}
                  className="w-full sm:w-auto"
                >
                  Fill Test Credentials
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  id="reset-btn"
                  onClick={handleReset}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  id="register-site-btn"
                  onClick={() =>
                    window.open(
                      "https://www.google.com/recaptcha/admin/create",
                      "_blank",
                      "noopener"
                    )
                  }
                  className="w-full sm:w-auto"
                >
                  Register New Site
                </Button>
              </div>
            </form>
            {showTestCreds && (
              <Card className="mb-4">
                <CardHeader>
                  <div className="mb-2 font-semibold flex items-center gap-2">
                    Test Site Key: <code>{TEST_SITE_KEY}</code>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="px-2 py-1 text-xs"
                      onClick={() => handleCopy(TEST_SITE_KEY)}
                      title="Copy Site Key"
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="mb-2 font-semibold flex items-center gap-2">
                    Test Secret: <code>{TEST_SECRET}</code>
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="px-2 py-1 text-xs"
                      onClick={() => handleCopy(TEST_SECRET)}
                      title="Copy Secret"
                    >
                      Copy
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            )}
            {siteKey && (
              <form className="mb-6" onSubmit={(e) => e.preventDefault()}>
                <div
                  className="mb-6 flex justify-center items-center w-full overflow-x-auto"
                  id="recaptcha-container"
                  suppressHydrationWarning
                  style={{ minHeight: 78 }}
                >
                  {/* reCAPTCHA widget rendered client-side */}
                  <div id="recaptcha-widget" ref={recaptchaWidgetRef} className="w-full" />
                </div>
              </form>
            )}
            {responseToken && (
              <Card className="p-4 rounded mb-4">
                <CardContent>
                  <div className="font-semibold mb-2 flex items-center gap-2">
                    Generated Response Token:{" "}
                    <Button
                      type="button"
                      size="sm"
                      variant="secondary"
                      className="px-2 py-1 text-xs"
                      id="copy-response-btn"
                      title="Copy to clipboard"
                      onClick={() => handleCopy(responseToken)}
                    >
                      Copy
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="break-all">{responseToken}</code>
                  </div>
                  <TypographySmall className="mt-2">
                    Use this token as <b>response</b> in your API call to{" "}
                    <code>https://www.google.com/recaptcha/api/siteverify</code> with
                    your secret.
                  </TypographySmall>
                </CardContent>
              </Card>
            )}
            <Separator className="my-8" />
            <TypographySmall className="text-center block">
              For testing purposes only. No data is stored.
            </TypographySmall>
            <SEOContent />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
