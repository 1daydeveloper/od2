"use client";
import React, { useState } from "react";
import TrendingWords from "@/app/components/trending";
import DeletionTimer from "@/app/components/temp-mail/DeletionTimer";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown, Mail, ClipboardCopy, Copy, Loader, Loader2Icon, PencilLineIcon, MailX } from "lucide-react";
export default function GetEmailByID() {
  const [id, setId] = useState("");
  const [emails, setEmails] = useState([]);
  const [emailcontent, setEmailContent] = useState({});
  const [activeTab, setActiveTab] = useState(null); // To track the active tab
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [intervalId, SetIntervalId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false); // Feedback state

  const stopRetry = () => {
    if (intervalId) {
      clearInterval(intervalId); // Stop the timeout if it's still active
      SetIntervalId(null); // Reset timeout ID
    }
    setIsLoading(false); // Stop loading immediately
    setIsRefreshing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmails([]);
    stopRetry();
    setEmailContent({});
    gtag("event", "submit", {
      event_category: "user_engagement",
      event_label: "Temp_Mail_Submit",
      value: id,
    });
    const retryFetch = () => {
      setIsRefreshing(true);
      setError(""); // Reset the error message
      const attemptFetch = () => {
        // If retry is stopped, exit immediately
        fetch(`/api/get-email/?id=${id}`)
          .then((response) => response.json())
          .then((data) => {
            // If retry is stopped, exit immediately
            if (data.length === 0) {
              setIsLoading(true); // Set loading to true when fetching
              // Retry after 10 seconds
            } else {
              setIsLoading(false); // Set loading to false when fetch is done
              setEmails(data);
              setIsRefreshing(false);
            }
          })
          .catch((err) => {
            // If retry is stopped, exit immediately

            setError("An error occurred while fetching emails");
            setIsLoading(false); // Stop loading if an error occurs
            setIsRefreshing(false); //
          });
      };

      attemptFetch(); // Start the initial fetch attempt
    };

    // Call the function to start the retry fetch process
    retryFetch();
    SetIntervalId(setInterval(retryFetch, 10000));
  };

  function getemailcontentdata(emailid) {
    setActiveTab(emailid);

    setEmailContent(emails.find((email) => email._id === emailid));
  }
  const decodeHtml = (html) => {
    // Decode HTML content
    const txt = document.createElement("textarea");
    let attachments = emailcontent.attachments;
    txt.innerHTML = html;
    const decodedContent = txt.value;

    // If attachments are not present or empty, return decoded content
    if (!attachments || attachments.length === 0) {
      return decodedContent;
    }

    // Create a mapping of CID to data URL or filename
    const cidMap = attachments.reduce((map, attachment) => {
      if (attachment.cid) {
        const dataUrl = `data:${attachment.contentType};base64,${attachment.content}`;
        map[attachment.cid] = dataUrl;
      }
      return map;
    }, {});

    // Replace <img> tags with updated src
    const updatedContent = decodedContent.replace(
      /<img\s+[^>]*src=["']cid:([^"']+)["'][^>]*>/g,
      (match, cid) => {
        const replacementSrc = cidMap[cid];
        return replacementSrc
          ? match.replace(`cid:${cid}`, replacementSrc)
          : match;
      }
    );

    return updatedContent;
  };

  function isValidUsername(username) {
    const usernameRegex = /^[a-z0-9]+(?:\.[a-z0-9]+)*$/;
    return usernameRegex.test(username);
  }
  function handleInputChange(e) {
    const reservedUsernames = [
      "admin",
      "support",
      "contact",
      "help",
      "sales",
      "billing",
      "hr",
      "ceo",
      "info",
      "team",
      "noreply",
      "security",
      "jobs",
      "marketing",
      "press",
      "developer",
      "feedback",
      "customerservice",
    ];
    const inputText = e.target.value.toLowerCase(); // Convert to lowercase
    setError(""); // Reset the error message

    let filteredText = inputText;
    if (inputText.includes("@")) {
      filteredText = inputText.split("@")[0]; // Remove everything after '@'
    }

    // Check if the username is reserved
    if (reservedUsernames.includes(filteredText)) {
      setError("This is a reserved address. Please use a different username.");
      setIsSubmitEnabled(false);
      return;
    }

    // Update the state with the filtered text
    setId(filteredText);

    // Check for an empty string
    if (filteredText === "") {
      setIsSubmitEnabled(false); // Disable submit button
      return;
    }
    gtag("event", "button_click", {
      event_category: "user_engagement",
      event_label: "Temp_Mail_Click",
      value: filteredText,
    });
    // Validate the username
    if (!isValidUsername(filteredText)) {
      setError(
        "Invalid username. Please follow the <a href='#userNameRules' class='text-blue-500 hover:underline inline-block'>Scroll to Username Rules</a>."
      );
      setIsSubmitEnabled(false);
      return;
    }

    // Enable submit button and log event
    setIsSubmitEnabled(true);
  }

  function addKeyToInput(data) {
    setId("inputText");
    setId(data);
    setIsSubmitEnabled(true);
  }
  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard not supported on this browser");
    } else {
      navigator.clipboard.writeText(id + "@tm.od2.in");
      toast.success("Email Copied!");
    }
  };
  function timeAgo(isoDate) {
    const currentTime = new Date(); // Local system time
    const targetTime = new Date(isoDate); // Target time from the ISO string

    const diffInMs = currentTime - targetTime; // Difference in milliseconds
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);

    // Formatting the output based on the time difference
    if (diffInMinutes < 1) {
      return `${diffInSeconds} seconds ago`; // Less than 1 minute
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`; // Less than 1 hour
    } else if (diffInHours < 24) {
      return `${diffInHours}h ${diffInMinutes % 60}m ago`; // Less than 24 hours
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`; // More than 24 hours
    }
  }

  function convertToLocalTime(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString(); // Local time with date and time
  }

  const handleFeedback = (type) => async () => {
    if (!emailcontent._id) return;
    let description = "";
    if (type === "bad") {
      description = window.prompt("Please provide a description (optional):", "");
      // If user cancels prompt, don't send feedback
      if (description === null) return;
    }
    setFeedbackLoading(true);
    try {
      const res = await fetch("/api/emails/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailId: emailcontent._id,
          mail: emailcontent.to?.value?.[0]?.address, // send the recipient email address
          feedback: type === "good" ? "Good" : "Bad",
          description: description || "",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Feedback submitted. Thank you!");
      } else {
        toast.error(data.error || "Failed to submit feedback");
      }
    } catch (err) {
      toast.error("Failed to submit feedback");
    }
    setFeedbackLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 min-h-screen ">
      <h2 className="text-2xl font-bold mb-4">
        Temp Mail
        <span className="m-3 inline-block px-2 py-1 text-xl font-semibold !text-slate-950 bg-yellow-500 rounded-full">
          Beta
        </span>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="md:flex-col relative min-w-20 items-center space-x-2 self-center ">
          <input
            type="text"
            id="username"
            value={id}
            onChange={handleInputChange}
            autoComplete="off"
            required
            className="w-full bg-transparent h-10 placeholder:text-slate-400  text-sm border border-slate-200 rounded-md pr-6 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter your email prefix/Username (we will add @tm.od2.in for you)"
          />

            <Mail className="absolute left-1 top-2 " />
          <button
            className={`absolute right-1 top-1  py-1 px-2.5 border border-transparent text-center text-sm  shadow-sm hover:shadow  focus:shadow-none ${
              isSubmitEnabled
                ? ""
                : "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            }`}
            disabled={!isSubmitEnabled}
            type="submit"
          >
            Check Inbox
          </button>
        </div>
      </form>
      {error && (
        <div className="text-red-500 ">
          <span dangerouslySetInnerHTML={{ __html: error }} />
        </div>
      )}
      <div className="p-3 rounded-md flex gap-2 items-center ">
        <p>
          Email:<span className="font-bold"> {id}@tm.od2.in</span>
        </p>
        <button
          onClick={copyToClipboard}
          disabled={!isSubmitEnabled}
          className={`bg-yellow-500 flex gap-1 text-white px-3 py-1 rounded-md ${
            isSubmitEnabled
              ? ""
              : "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          }`}
        >
          <Copy />
          Copy
        </button>
      </div>
      <TrendingWords addKeyToInput={addKeyToInput} />

      <div className="flex flex-col lg:flex-row gap-2">
        <div className="maincard flex flex-col space-y-2 lg:w-1/3 w-full  p-4 rounded-md">
          <div className="card relative items-center flex gap-3 justify-center rounded-md ">
            <h3 className="text-2xl">Inbox</h3>
            <Loader
              style={{
                animation: isRefreshing ? "spin 1s linear infinite" : "none", // Spin when refreshing
              }}
              hidden={!isRefreshing}
            />
              
          </div>

          <div className="flex flex-col overflow-y-auto gap-2 w-100 max-h-[calc(100vh-180px)] max-lg:max-h-[calc(60vh-180px)]">
            {emails && emails.length !== 0 ? (
              emails
                .slice()
                .reverse()
                .map((email) => (
                  <button
                    key={email._id}
                    className={`px-1 py-1 rounded-md shadow-md border-2 border-gray-100 ${
                      activeTab === email._id
                        ? "bg-blue-500 text-white"
                        : " "
                    } 	`}
                    onClick={() => getemailcontentdata(email._id)} // Update the active tab
                  >
                    <div className="flex flex-row gap-3">
                      <div className="w-30">
                        <Mail size={24} />
                      </div>
                      <div className="text-start">
                        <p className="font-bold md:text-sm">
                          {email.from.value[0].address || "Untitled Email"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-3">
                      <div className="w-30">
                        <p className="">
                          {timeAgo(email.date) || "Untitled Email"}
                        </p>
                      </div>
                      <div className="text-wrap text-start overflow-auto">
                        <p className="truncate-lines">
                          {email.subject || "Untitled Email"}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
            ) : isLoading ? (
              <div className="flex flex-col items-center p-3">
                <Loader2Icon size={48} style={{
                    animation: isRefreshing
                      ? "spin 1s linear infinite"
                      : "none", // Spin when refreshing
                  }}
                />
                <div>
                  <p className="text-dark text-center">
                    Waiting for the First Mail to Touch our Inbox
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={stopRetry}
                    className={`bg-yellow-600  md:p-3 px-4 m-3 py-2 rounded-md hover:bg-white transition`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-2 py-4 text-center">
                <div>
                 <PencilLineIcon size={48} />
                </div>

                <div className="font-bold text-xl mt-4">
                  Enter your email prefix (we will add @tm.od2.in for you){" "}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="maincard flex-grow lg:w-2/3 w-full space-y-4   p-4 rounded-md">
          <div className="card items-center flex justify-center  rounded-md ">
            <h3 className="text-2xl">Email Content</h3>
          </div>{" "}
          <div className="card overflow-y-auto max-h-[calc(100vh-170px)] max-lg:max-h-[calc(100vh-180px)]">
            {Object.keys(emailcontent).length !== 0 ? (
              <div>
                <div className="rounded p-1">
                  <div className="font-bold text-xl">
                    {emailcontent.subject}
                  </div>

                  <div className="flex">
                    <p>
                      <strong>From:</strong>{" "}
                      {emailcontent.from.value[0].address}
                    </p>
                  </div>
                  <div className="flex">
                    <p>
                      <strong>Recived Date:</strong>{" "}
                      {convertToLocalTime(emailcontent.date) ||
                        "Untitled Email"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p>
                      Feedback:
                    </p>
                    <ThumbsUp
                      color="currentcolor"
                      fill="green"
                      className={`hover:cursor-pointer ${feedbackLoading ? "opacity-50 pointer-events-none" : ""}`}
                      onClick={handleFeedback('good')}
                    />
                    <ThumbsDown
                      color="currentcolor"
                      fill="red"
                      className={`hover:cursor-pointer ${feedbackLoading ? "opacity-50 pointer-events-none" : ""}`}
                      onClick={handleFeedback('bad')}
                    />
                  </div>
                </div>
                <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

                <p>
                  <strong>Content:</strong>
                </p>
                <div>
                  <div
                    className="rounded p-1 mb-4 overflow-hidden "
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(emailcontent.html),
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-2 py-4 text-center">
                <div>
              <MailX size={48} />
                </div>

                <div className="font-bold text-xl mt-4">
                  Select an Email Recived To Show the content of an email.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="maincard rounded-lg shadow ">
        <div className="container mx-auto mb-2">
          <h2 className="text-3xl md:text-5xl font-bold text-centermb-6">
            Temporary Email(temp Mail) Made Simple with OD2
          </h2>
          <p className="text-lg text-center mb-8">
            Generate{" "}
            <a
              href="https://en.wikipedia.org/wiki/Disposable_email_address"
            >
              disposable emails
            </a>{" "}
            on-the-go! Secure, fast, and perfect for protecting your privacy or
            testing software.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="mb-3">
              <h2 className="text-2xl font-semibold mb-4">
                Why Choose OD2 Temporary Mail?
              </h2>
              <ul className="list-disc pl-5 space-y-2 ">
                <li>
                  <strong>No Signup Required:</strong> Create emails
                  effortlessly by using{" "}
                  <code>&lt;yourusername&gt;@tm.od2.in</code>. No registrations,
                  no hassle.
                </li>
                <li>
                  <strong>Instant Inbox Access:</strong> Simply visit{" "}
                  <a
                    href="https://www.od2.in/temp-mail"
                    className=" hover:underline"
                    target="_blank"
                    rel="noopener"
                  >
                    OD2 Temporary Mail Inbox
                  </a>
                  , enter your username, and view your emails on any device.
                </li>
                <li>
                  <strong>Email Auto-Deletion:</strong> All emails are
                  automatically deleted every <strong>24 hours</strong>,
                  ensuring your inbox stays clean and private.
                </li>
                <li>
                  <strong>Privacy First:</strong> Protect your primary email
                  from spam and promotional clutter while staying productive.
                </li>
              </ul>
            </div>
           

            <div>
              <h2 className="text-2xl font-semibold  mb-4">Perfect For:</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Quick Account Creation:</strong> Sign up for services
                  without exposing your personal email.
                </li>
                <li>
                  <strong>Software Testing:</strong> Developers and QA
                  professionals can generate unlimited temporary emails for
                  seamless testing.
                </li>
                <li>
                  <strong>Secure Transactions:</strong> Keep your sensitive
                  transactions private with disposable emails.
                </li>
              </ul>
            </div>
          </div>
          <section className="card text-center py-12 my-2">
            <DeletionTimer/>
            </section>
          <div id="userNameRules" className="mb-3">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
              Username Rules
            </h2>
            <ul className="list-disc pl-5 space-y-2 ">
              <li>
                Usernames can contain <strong>letters (a-z)</strong>,{" "}
                <strong>numbers (0-9)</strong>, and <strong>periods (.)</strong>
                .
              </li>
              <li>
                Usernames cannot contain:
                <ul className="list-disc pl-5 mt-1">
                  <li>Ampersand (&)</li>
                  <li>Equals sign (=)</li>
                  <li>Underscore (_)</li>
                  <li>Apostrophe (&apos;)</li>
                  <li>Dash (-)</li>
                  <li>Plus sign (+)</li>
                  <li>Comma (,)</li>
                  <li>Brackets (&lt;, &gt;)</li>
                  <li>More than one period (.) in a row</li>
                </ul>
              </li>
              <li>Usernames cannot begin or end with periods (.).</li>
              <li>
                Other than the rules above, periods (.) do not affect mail
                addresses.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <section className="card shadow-lg rounded-lg ">
              <h2 className="text-2xl font-bold ">
                Why Choose Temporary Mail?
              </h2>
              <p className="mt-4">
                Temporary mail, also known as disposable mail or temp mail,
                helps you:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Protect your primary email address from spam.</li>
                <li>
                  Register for websites or services without revealing personal
                  information.
                </li>
              </ul>
            </section>

            <section className="card text-center py-12">
              <h2 className="text-3xl font-bold">Try It Now</h2>
              <p className="mt-4 text-lg">
                Ready to protect your inbox and maintain your privacy?
              </p>
              <a href="#" className="abtn inline-block">
                Get Started for Free
              </a>
            </section>
            <section className="card shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold">
                Features of Our Temp Mail Service
              </h2>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>
                  <strong>Instant Email Creation:</strong> Get a disposable
                  email address within seconds.
                </li>
                <li>
                  <strong>Spam-Free Experience:</strong> Keep your inbox clean
                  and secure.
                </li>
                <li>
                  <strong>Privacy-Focused:</strong> No personal information
                  required.
                </li>
                <li>
                  <strong>Fast & Responsive Design:</strong> Built with Tailwind
                  CSS for a sleek experience.
                </li>
              </ul>
            </section>

            <section className="card shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold ">How It Works</h2>
              <ol className="list-decimal list-inside mt-4 space-y-2">
                <li>Visit our website.</li>
                <li>Instantly generate a disposable email address.</li>
                <li>
                  Copy and use your email for registrations or verifications.
                </li>
                <li>Receive emails in real-time and delete them when done.</li>
              </ol>
            </section>

            <section className="card border shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold">FAQs About Temporary Mail</h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-bold">What is temp mail?</h3>
                  <p>
                    Temp mail is a disposable email service that provides a
                    quick, temporary inbox to protect your privacy.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Is it free?</h3>
                  <p>Yes, our temp mail service is 100% free to use.</p>
                </div>
                <div>
                  <h3 className="font-bold">
                    Can I use it for long-term needs?
                  </h3>
                  <p>
                    No, temp mail is designed for short-term use, ensuring
                    maximum security and privacy.
                  </p>
                </div>
              </div>
            </section>
            <section className="card border shadow-xl rounded-xl  text-center py-12">
              <h1 className="text-4xl font-bold">Temporary Email Service</h1>
              <p className="mt-4 text-lg">
                Fast, Secure, and Hassle-Free Disposable Email for Everyone
              </p>
            </section>

            {/* History and Features Section */}
            <section className="max-w-6xl mx-auto py-12 px-4">
              <h2 className="text-3xl font-semibold ">
                The Evolution of Temporary Mail
              </h2>
              <p className="mt-4  leading-7">
                Temporary email services have evolved as a practical solution to
                combat email overload, privacy concerns, and online security
                risks.
                <a
                  href="https://en.wikipedia.org/wiki/Email_privacy"
                  className=" hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about email privacy.
                </a>
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card p-6 shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">
                    Secure Online Signups
                  </h3>
                  <p className="mt-2 ">
                    Use temporary mail for registrations on websites, forums, or
                    social media platforms without sharing your permanent email.
                  </p>
                </div>
                <div className="card p-6 shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">Prevent Spam</h3>
                  <p className="mt-2 ">
                    Avoid promotional emails and unsolicited offers in your
                    primary inbox.
                    <a
                      href="https://support.google.com/mail/answer/8126226"
                      className=" hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Learn how to manage spam.
                    </a>
                  </p>
                </div>
                <div className="card p-6  shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">
                    Testing and Development
                  </h3>
                  <p className="mt-2 ">
                    Ideal for developers and QA testers to test email workflows
                    without cluttering real accounts.
                  </p>
                </div>
                <div className="card p-6  shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">Enhanced Privacy</h3>
                  <p className="mt-2 ">
                    Safeguard your identity while participating in online
                    surveys, polls, or giveaways.
                  </p>
                </div>
              </div>
            </section>

            {/* Call-to-Action Section */}
          </div>
          <div className="card shadow-lg rounded-lg p-6 mt-8  text-center">
            <h3 className="text-xl md:text-2xl font-semibold 800 mb-4">
              Ready to Simplify Your Email Experience?
            </h3>
            <p className="text-lg mb-6">
              Start using OD2 Temporary Mail today and enjoy fast, secure, and
              disposable email solutions at your fingertips.
            </p>
            <a
              href="#"
              className="abtn inline-block px-6 py-3 text-lg font-medium   rounded-lg focus:ring "
            >
              Access Your Temporary Inbox
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
