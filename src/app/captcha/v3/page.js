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
      <div className="mx-auto max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>
              <TypographyH1 className="text-3xl mb-4 text-center">
                Test Google reCAPTCHA v3
              </TypographyH1>
            </CardTitle>
            <TypographyP className="mb-6 text-center">
              Enter your <b>Site Key</b> to generate a test response token for API
              testing.
            </TypographyP>
          </CardHeader>
          <CardContent>
            <form
              className="mb-6"
              id="recaptcha-form"
              onSubmit={(e) => e.preventDefault()}
            >
              <Label htmlFor="sitekey-input" className="block mb-2 font-semibold">
                Site Key
              </Label>
              <Input
                type="text"
                name="sitekey"
                className="mb-4"
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
              <div className="flex flex-wrap flex-col gap-2 sm:flex-row sm:flex-wrap">
                <Button
                  type="button"
                  variant="default"
                  onClick={handleGenerateToken}
                  disabled={!siteKey}
                >
                  Generate New response
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  id="reset-btn"
                  onClick={handleReset}
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
                >
                  Register New Site
                </Button>
              </div>
            </form>
            {status && (
              <TypographySmall className="text-xs mb-2 block" ref={recaptchaStatusRef}>
                {status}
              </TypographySmall>
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
