import { TypographyH2, TypographyP, TypographySmall } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const SEOContent = () => {
  return (
    <section className=" max-w-2xl bg-white dark:bg-zinc-900 rounded-lg  sm:px-8">
      <TypographyH2 className="mb-2">How to Use This Page</TypographyH2>
      <ol className="list-decimal list-inside mb-4 space-y-2">
        <li>
          Register your site and obtain a{" "}
          <Link
            href="https://www.google.com/recaptcha/Link>dmin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Google reCAPTCHA v2 Site Key
          </Link>
        </li>
        <li>Enter your Site Key in the input above.</li>
        <li>
          Click <b>Load reCAPTCHA / Generate New response</b> to display the
          reCAPTCHA widget and solve the challenge.
        </li>
        <li>
          Copy the generated response token and use it in your API call to{" "}
          <code>https://www.google.com/recaptcha/api/siteverify</code> with your
          secret key.
        </li>
      </ol>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Usage Policy</TypographyH2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>This tool is for developers and testers only.</li>
        <li>No data or keys are stored or logged.</li>
        <li>Do not use this tool for production or sensitive operations.</li>
      </ul>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Who Can Use This Tool?</TypographyH2>
      <TypographyP className="mb-4">
        Anyone with a valid{" "}
        <Link
          href="https://www.google.com/recaptcha/about/"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Google reCAPTCHA v2
        </Link>{" "}
        site key can use this page to test token generation for API integration
        and backend verification.
      </TypographyP>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">What is Google reCAPTCHA v2?</TypographyH2>
      <TypographyP className="mb-4">
        <Link
          href="https://developers.google.com/recaptcha/docs/display"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          reCAPTCHA v2
        </Link>{" "}
        is a security solution from Google that helps protect your website from
        spam and abuse. It requires users to complete a challenge (such as
        selecting images or checking a box) to prove they are human before
        submitting forms or accessing certain features.
      </TypographyP>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Get Started</TypographyH2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <Link
            href="https://www.google.com/recaptcha/Link>dmin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Register your site for reCAPTCHA v2
          </Link>
        </li>
        <li>
          <Link
            href="https://developers.google.com/recaptcha/docs/display"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Read the official reCAPTCHA v2 documentation
          </Link>
        </li>
        <li>
          <Link
            href="https://www.google.com/recaptcha/about/"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Learn more about reCAPTCHA
          </Link>
        </li>
      </ul>
      <Separator className="mb-4" />
      <TypographyH2 className="mb-2">Further Reading</TypographyH2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>
          <Link
            href="/blog/test-google-reCAPTCHA-v2"
            className="underline"
            target="_blank"
            rel="noopener"
          >
            How to Test Google reCAPTCHA v2 (Blog)
          </Link>
        </li>
        <li>
          <Link
            href="/blog/test-google-reCAPTCHA-v3"
            className="underline"
            target="_blank"
            rel="noopener"
          >
            How to Test Google reCAPTCHA v3 (Blog)
          </Link>
        </li>
      </ul>
    </section>
  );
};
