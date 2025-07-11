import { TypographyH2, TypographyP, TypographySmall } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

export const SEOContent = () => {
  return (
    <div className="mt-12 p-6 rounded text-sm">
      <TypographyH2 className="mb-2">How to Use This Page</TypographyH2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          Register your site and obtain a{" "}
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Google reCAPTCHA v3 Site Key
          </a>
          .
        </li>
        <li>Enter your Site Key in the input above.</li>
        <li>
          Click <b>Load reCAPTCHA / Generate New response</b> to generate a test
          token.
        </li>
        <li>
          Copy the generated response token and use it in your API call to{" "}
          <code>https://www.google.com/recaptcha/api/siteverify</code> with your
          secret key.
        </li>
      </ol>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Usage Policy</TypographyH2>
      <ul className="list-disc list-inside mb-4">
        <li>This tool is for developers and testers only.</li>
        <li>No data or keys are stored or logged.</li>
        <li>Do not use this tool for production or sensitive operations.</li>
      </ul>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Who Can Use This Tool?</TypographyH2>
      <TypographyP className="mb-4">
        Anyone with a valid{" "}
        <a
          href="https://www.google.com/recaptcha/about/"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Google reCAPTCHA v3
        </a>{" "}
        site key can use this page to test token generation for API integration
        and backend verification.
      </TypographyP>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">What is Google reCAPTCHA v3?</TypographyH2>
      <TypographyP className="mb-4">
        <a
          href="https://developers.google.com/recaptcha/docs/v3"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          reCAPTCHA v3
        </a>{" "}
        is a frictionless, invisible security solution from Google that helps
        protect your website from spam and abuse. It works in the background and
        assigns a score based on user interactions, allowing you to take
        appropriate action without user interruption.
      </TypographyP>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Get Started</TypographyH2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Register your site for reCAPTCHA v3
          </a>
        </li>
        <li>
          <a
            href="https://developers.google.com/recaptcha/docs/v3"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Read the official reCAPTCHA v3 documentation
          </a>
        </li>
        <li>
          <a
            href="https://www.google.com/recaptcha/about/"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Learn more about reCAPTCHA
          </a>
        </li>
      </ul>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Further Reading</TypographyH2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <a
            href="/blog/test-google-reCAPTCHA-v2"
            className="underline"
            target="_blank"
            rel="noopener"
          >
            How to Test Google reCAPTCHA v2 (Blog)
          </a>
        </li>
        <li>
          <a
            href="/blog/test-google-reCAPTCHA-v3"
            className="underline"
            target="_blank"
            rel="noopener"
          >
            How to Test Google reCAPTCHA v3 (Blog)
          </a>
        </li>
      </ul>
    </div>
  );
};
