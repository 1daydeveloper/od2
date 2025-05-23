export const SEOContent = () => {
  return (
    <section className="mt-12 p-6 rounded text-sm">
      <h2 className="text-xl font-bold mb-2">How to Use This Page</h2>
      <ol className="list-decimal list-inside mb-4">
        <li>
          Register your site and obtain a{" "}
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Google reCAPTCHA v2 Site Key
          </a>
          .
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
      <h2 className="text-xl font-bold mb-2">Usage Policy</h2>
      <ul className="list-disc list-inside mb-4">
        <li>This tool is for developers and testers only.</li>
        <li>No data or keys are stored or logged.</li>
        <li>Do not use this tool for production or sensitive operations.</li>
      </ul>
      <h2 className="text-xl font-bold mb-2">Who Can Use This Tool?</h2>
      <p className="mb-4">
        Anyone with a valid{" "}
        <a
          href="https://www.google.com/recaptcha/about/"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          Google reCAPTCHA v2
        </a>{" "}
        site key can use this page to test token generation for API integration
        and backend verification.
      </p>
      <h2 className="text-xl font-bold mb-2">What is Google reCAPTCHA v2?</h2>
      <p className="mb-4">
        <a
          href="https://developers.google.com/recaptcha/docs/display"
          target="_blank"
          rel="noopener"
          className="underline"
        >
          reCAPTCHA v2
        </a>{" "}
        is a security solution from Google that helps protect your website from
        spam and abuse. It requires users to complete a challenge (such as
        selecting images or checking a box) to prove they are human before
        submitting forms or accessing certain features.
      </p>
      <h2 className="text-xl font-bold mb-2">Get Started</h2>
      <ul className="list-disc list-inside mb-4">
        <li>
          <a
            href="https://www.google.com/recaptcha/admin/create"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Register your site for reCAPTCHA v2
          </a>
        </li>
        <li>
          <a
            href="https://developers.google.com/recaptcha/docs/display"
            target="_blank"
            rel="noopener"
            className="underline"
          >
            Read the official reCAPTCHA v2 documentation
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
      <h2 className="text-xl font-bold mb-2">Further Reading</h2>
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
    </section>
  );
};
