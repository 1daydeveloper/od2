"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown, Mail, Trash2Icon, Clock1, Copy, Loader, Loader2Icon, PencilLineIcon, MailX, Trash2, Clock, ExternalLink, Smartphone, ShieldCheck, Zap, RefreshCw, X, Info, History, ChevronDown, ChevronUp, Bell } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

/**
 * Temp Mail Component with Google Analytics tracking
 * 
 * GA Events tracked:
 * 1. inbox_check - When user submits form to check inbox (includes full email)
 * 2. temp_email_usage - Usage analytics for tm.od2.in domain
 * 3. email_input - When user types in the email input field
 * 4. emails_received - When emails are successfully fetched (includes count)
 * 5. email_view - When user clicks to view an email
 * 6. email_details - Additional details about viewed emails (subject, sender)
 */

// Reserved email addresses (local-parts) that are not allowed
const RESERVED_EMAILS = [
  'postmaster',
  'abuse',
  'hostmaster',
  'webmaster',
  'admin',
  'administrator',
  'mailer-daemon',
  'root',
  'hr',
  'support',
  'info',
  'contact',
  'noreply',
  'no-reply'
];

export default function GetEmailByID() {
  const [id, setId] = useState("");
  const [emails, setEmails] = useState([]);
  const [emailcontent, setEmailContent] = useState({});
  const [emailIframeSrc, setEmailIframeSrc] = useState("");
  const [activeTab, setActiveTab] = useState(null); // To track the active tab
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [intervalId, SetIntervalId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(true); // Default to true if you want it active or keep as false
  const [feedbackLoading, setFeedbackLoading] = useState(false); // Feedback state
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("tm_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const addToHistory = (prefix) => {
    if (!prefix) return;
    setHistory(prev => {
      const filtered = prev.filter(item => item !== prefix);
      const updated = [prefix, ...filtered].slice(0, 10); // Keep last 10
      localStorage.setItem("tm_history", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromHistory = (prefix) => {
    setHistory(prev => {
      const updated = prev.filter(item => item !== prefix);
      localStorage.setItem("tm_history", JSON.stringify(updated));
      return updated;
    });
  };

  // Cleanup interval and blob URLs on component unmount
  useEffect(() => {
    // Auto-hide notification after 5 seconds
    const notificationTimer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => {
      clearTimeout(notificationTimer);
      if (intervalId) {
        clearInterval(intervalId);
      }
      // Clean up blob URL
      if (emailIframeSrc) {
        URL.revokeObjectURL(emailIframeSrc);
      }
    };
  }, [intervalId, emailIframeSrc]);

  const stopRetry = () => {
    if (intervalId) {
      clearInterval(intervalId); // Stop the timeout if it's still active
      SetIntervalId(null); // Reset timeout ID
    }
    setIsLoading(false); // Stop loading immediately
    setIsRefreshing(false);
  };

  const handleReset = () => {
    stopRetry();
    setEmails([]);
    setEmailContent({});
    setError("");
    if (emailIframeSrc) {
      URL.revokeObjectURL(emailIframeSrc);
      setEmailIframeSrc("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmails([]);
    stopRetry();
    setEmailContent({});

    // Clean up previous iframe src
    if (emailIframeSrc) {
      URL.revokeObjectURL(emailIframeSrc);
      setEmailIframeSrc("");
    }

    // Safely call gtag if available - Track inbox check with full email address
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      const fullEmail = `${id}@tm.od2.in`;
      window.gtag("event", "temp_email_creation", {
        event_category: "temp_mail",
        event_label: "Check_Inbox",
        custom_mail_id_created: id,
        value: id,
      });

    }
    const retryFetch = () => {
      setIsRefreshing(true);
      setError(""); // Reset the error message
      const attemptFetch = () => {
        // If retry is stopped, exit immediately
        fetch(`/api/get-email/?id=${id}`)
          .then((response) => {
            if (!response.ok) {
              if (response.status === 400) {
                return response.json().then(errData => {
                  throw new Error(errData.error || 'Invalid request');
                });
              }
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => {
            // Ensure data is an array
            const emailsArray = Array.isArray(data) ? data : [];

            // If retry is stopped, exit immediately
            if (emailsArray.length === 0) {
              setIsLoading(true); // Set loading to true when fetching
              // Retry after 10 seconds
            } else {
              setIsLoading(false); // Set loading to false when fetch is done
              setEmails(emailsArray);
              setIsRefreshing(false);
              addToHistory(id); // Save to history on successful fetch

              // Scroll to inbox list on mobile when results are found
              const isMobile = typeof window !== 'undefined' ? window.innerWidth < 480 : false;
              if (isMobile && emailsArray.length > 0) {
                setTimeout(() => {
                  const inboxList = document.querySelector('[data-inbox-list]');
                  if (inboxList) {
                    inboxList.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }
            }
          })
          .catch((err) => {
            // If retry is stopped, exit immediately
            // console.error("Error fetching emails:", err);
            setError(err.message || "An error occurred while fetching emails");
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

    const selectedEmail = emails.find((email) => email._id === emailid);
    setEmailContent(selectedEmail);

    // Create iframe content for email rendering
    if (selectedEmail && selectedEmail.html) {
      const decodedHtml = decodeHtml(selectedEmail.html, selectedEmail);
      const blob = new Blob([decodedHtml], { type: 'text/html' });
      const blobUrl = URL.createObjectURL(blob);

      // Clean up previous blob URL
      if (emailIframeSrc) {
        URL.revokeObjectURL(emailIframeSrc);
      }

      setEmailIframeSrc(blobUrl);
    }

    // Scroll to email content on mobile devices
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 480 : false; // lg breakpoint
    if (isMobile) {
      setTimeout(() => {
        const emailContentSection = document.querySelector('[data-email-content]');
        if (emailContentSection) {
          emailContentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100); // Small delay to ensure content is rendered
    }
  }
  const decodeHtml = (html, email = null) => {
    // Ensure we're running in browser environment
    if (typeof window === 'undefined') {
      return html; // Return original html on server-side
    }

    // Decode HTML content
    const txt = document.createElement("textarea");
    let attachments = email ? email.attachments : emailcontent.attachments;
    txt.innerHTML = html;
    const decodedContent = txt.value;

    // Create a mapping of CID to data URL for attachments only
    const cidMap = attachments?.reduce((map, attachment) => {
      if (attachment.cid) {
        const dataUrl = `data:${attachment.contentType};base64,${attachment.content}`;
        map[attachment.cid] = dataUrl;
      }
      return map;
    }, {}) || {};

    // Replace <img> tags with updated src for attachments only
    const updatedContent = decodedContent.replace(
      /<img\s+[^>]*src=["']cid:([^"']+)["'][^>]*>/g,
      (match, cid) => {
        const replacementSrc = cidMap[cid];
        return replacementSrc
          ? match.replace(`cid:${cid}`, replacementSrc)
          : match;
      }
    );

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              margin: 0; 
              padding: 12px;
              max-width: 100vw;
              overflow-x: hidden;
              box-sizing: border-box;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #334155;
            }
            * {
              box-sizing: border-box !important;
              max-width: 100% !important;
              height: auto !important;
              overflow-wrap: anywhere !important;
              word-break: break-word !important;
            }
            img {
              max-width: 100% !important;
              height: auto !important;
              display: block;
              margin: 10px 0;
            }
            table {
              width: 100% !important;
              max-width: 100% !important;
              table-layout: fixed !important;
              border-collapse: collapse !important;
            }
            /* Handle fixed width containers common in promotional emails */
            [style*="width"], [width] {
              width: auto !important;
              max-width: 100% !important;
              min-width: 0 !important;
            }
            .mb_text { font-size: inherit !important; }
          </style>
        </head>
        <body>
          ${updatedContent || decodedContent}
        </body>
      </html>
    `;
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
    const rawInput = e.target.value.toLowerCase();
    const inputText = rawInput.replace(/\s+/g, ''); // Remove all whitespace
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

    // Reset state on input change to ensure container is cleared
    handleReset();
  }

  /**
   * Extracts OTP from email subject or content with context check
   */
  const extractOTP = (subject, text, html) => {
    const otpRegex = /\b(\d{4,8})\b/g;
    const keywords = ['code', 'otp', 'verify', 'verification', 'pin', 'secure', 'authenticator'];

    const hasContext = (val, matchIndex) => {
      if (!val) return false;
      const start = Math.max(0, matchIndex - 50);
      const end = Math.min(val.length, matchIndex + 50);
      const context = val.substring(start, end).toLowerCase();
      return keywords.some(keyword => context.includes(keyword));
    };

    // 1. Check Subject (Highest Priority)
    if (subject) {
      let match;
      while ((match = otpRegex.exec(subject)) !== null) {
        if (hasContext(subject, match.index)) return match[1];
      }
    }

    // 2. Check Text Body
    if (text) {
      let match;
      otpRegex.lastIndex = 0; // Reset regex
      while ((match = otpRegex.exec(text)) !== null) {
        if (hasContext(text, match.index)) return match[1];
      }
    }

    // 3. Check HTML Body
    if (html) {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const plainHtmlText = doc.body.textContent || "";
      let match;
      otpRegex.lastIndex = 0;
      while ((match = otpRegex.exec(plainHtmlText)) !== null) {
        if (hasContext(plainHtmlText, match.index)) return match[1];
      }
    }

    return null;
  };

  const detectedOTP = extractOTP(emailcontent.subject, emailcontent.text, emailcontent.html);

  const copyToClipboard = (text = null) => {
    const textToCopy = text || (id + "@tm.od2.in");
    if (!navigator.clipboard) {
      toast.error("Clipboard not supported on this browser");
    } else {
      navigator.clipboard.writeText(textToCopy);
      toast.success(text === null ? "Email Copied!" : "OTP Copied!");
    }
  };
  function timeAgo(isoDate) {
    if (!isoDate) return "Unknown time";

    try {
      const currentTime = new Date(); // Local system time
      const targetTime = new Date(isoDate); // Target time from the ISO string

      // Check if the date is valid
      if (isNaN(targetTime.getTime())) {
        return "Invalid date";
      }

      const diffInMs = currentTime - targetTime; // Difference in milliseconds
      const diffInSeconds = Math.floor(diffInMs / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);

      // Formatting the output based on the time difference
      if (diffInMinutes < 1) {
        return `${diffInSeconds} seconds ago`; // Less than 1 minute
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`; // Less than 1 hour
      } else if (diffInHours < 12) {
        return `${diffInHours}h ${diffInMinutes % 60}m ago`; // Less than 12 hours
      } else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`; // More than 12 hours (should be deleted soon)
      }
    } catch (error) {
      console.error('Error in timeAgo:', error);
      return "Unknown time";
    }
  }

  function convertToLocalTime(isoDate) {
    if (!isoDate) return "Unknown date";

    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleString(); // Local time with date and time
    } catch (error) {
      console.error('Error in convertToLocalTime:', error);
      return "Unknown date";
    }
  }

  function timeUntilDeletion(isoDate) {
    if (!isoDate) return "Unknown";

    try {
      const now = new Date();
      const emailDate = new Date(isoDate);

      if (isNaN(emailDate.getTime())) {
        return "Invalid date";
      }

      const deletionTime = new Date(emailDate.getTime() + (12 * 60 * 60 * 1000)); // 12 hours after receipt

      if (deletionTime <= now) {
        return "Deleting soon";
      }

      const diffInMilliseconds = deletionTime - now;
      const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
      const diffInHours = Math.floor(diffInMinutes / 60);

      if (diffInHours > 0) {
        return `${diffInHours}h ${diffInMinutes % 60}m left`;
      } else if (diffInMinutes > 0) {
        return `${diffInMinutes}m left`;
      } else {
        return "< 1m left";
      }
    } catch (error) {
      console.error('Error in timeUntilDeletion:', error);
      return "Unknown";
    }
  }

  const handleFeedback = (type) => async () => {
    if (!emailcontent._id) return;
    let description = "";
    // Show description prompt for both good and bad feedback
    description = typeof window !== 'undefined' ? window.prompt("Please provide a description (optional):", "") : "";
    // If user cancels prompt, don't send feedback
    if (description === null) return;

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
      <h1 className="text-3xl md:text-4xl font-bold mb-1">
        Temp Mail - Free Disposable Temporary Email
      </h1>
      <p className="text-muted-foreground text-sm mb-4 ">
        Get a free, disposable email address instantly. Protect your privacy and keep your primary inbox spam-free.Emails are automatically deleted after 12 hours.
      </p>

      {/* Promotion Banner for Test Mail */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">NEW</span>
          <p className="text-xs sm:text-sm font-medium">
            Need Test Mail templates? Try our new <Link href="/test-mail" className="text-blue-600 font-bold hover:underline">Test Mail Tool</Link>
          </p>
        </div>
        <Link href="/test-mail">
          <button className="text-[10px] sm:text-xs bg-white dark:bg-slate-900 border border-blue-500/30 px-3 py-1 rounded hover:bg-blue-50 transition-colors">
            Explore Templates
          </button>
        </Link>
      </div>

      {/* Android Beta App Banner */}
      <div className="mb-6 p-3 bg-gradient-to-r from-yellow-600/10 to-emerald-600/10 border border-yellow-500/20 rounded-lg flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-yellow-600/20 p-2 rounded-full text-yellow-600">
            <Smartphone size={20} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <p className="text-xs sm:text-sm font-semibold text-yellow-700 dark:text-yellow-400">
                OD2 Temp Mail Android App is here!
              </p>
              <span className="bg-yellow-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">BETA</span>
            </div>
            <p className="text-[10px] sm:text-xs opacity-80">
              Join our community group to get exclusive Beta access on the Play Store.
            </p>
          </div>
        </div>
        <a href="https://groups.google.com/g/od2-testers" target="_blank" rel="noopener noreferrer">
          <button className="text-[10px] sm:text-xs bg-white dark:bg-slate-900 border border-yellow-500/30 px-3 py-1 rounded hover:bg-yellow-50 transition-colors">
            Join Group
          </button>
        </a>
      </div>
      <div className="w-full max-w-4xl mx-auto">
        {showNotification && (
          <div className="mb-4 p-4 bg-green-600 text-white rounded-xl shadow-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
            <div className="bg-white/20 p-2 rounded-lg">
              <Bell size={20} />
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium leading-relaxed">
                We’ve reviewed your feedback and improved the tool. Thanks for helping us make it better!                </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            {/* Progress bar for auto-hide */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/30"
              style={{
                width: '100%',
                transformOrigin: 'left',
                animation: 'shrink 5s linear forwards'
              }}></div>
            <style dangerouslySetInnerHTML={{
              __html: `
                @keyframes shrink {
                  from { width: 100%; }
                  to { width: 0%; }
                }
              `}} />
          </div>
        )}
        <form onSubmit={handleSubmit} autoComplete="off" className="relative">
          <div className="relative group transition-all duration-300">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative flex flex-col md:flex-row items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  id="username"
                  value={id}
                  onChange={handleInputChange}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-transparent text-slate-900 dark:text-slate-100 text-sm md:text-base border-none focus:ring-0 focus:outline-none placeholder:text-slate-400"
                  placeholder="Enter your email prefix / Username"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto px-2 py-1 md:py-0 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 font-medium text-sm hidden md:inline">@tm.od2.in</span>

                <div className="flex items-center gap-1 w-full md:w-auto">
                  <button
                    disabled={!isSubmitEnabled || isRefreshing}
                    type="submit"
                    className={`flex items-center justify-center gap-2 flex-grow md:w-auto px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 ${isSubmitEnabled && !isRefreshing
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
                      }`}
                  >
                    {isRefreshing ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Zap className="h-4 w-4" />
                    )}
                    <span>{isRefreshing ? "Checking Inbox..." : "Check Inbox"}</span>
                  </button>

                  {(isRefreshing || isLoading) && (
                    <button
                      onClick={handleReset}
                      type="button"
                      className="p-2.5 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 transition-colors"
                      title="Cancel search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>

        {error && (
          <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
            <ShieldCheck className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-red-700 dark:text-red-400 text-sm font-medium">
              <span dangerouslySetInnerHTML={{ __html: error }} />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400">Current Email:</span>
            <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {id ? `${id}@tm.od2.in` : "None"}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard()}
            disabled={!id}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${id
              ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-md active:scale-95"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}
          >
            <Copy size={14} />
            Copy Email
          </button>
        </div>

        {/* Collapsible Recently Used History Section - Now inside the card area */}
        {history.length > 0 && (
          <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500">
            <Card className="border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shadow-sm relative">
              <button
                onClick={() => setIsHistoryVisible(!isHistoryVisible)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors rounded-t-lg"
              >
                <div className="flex items-center gap-2">
                  <History size={16} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Recently Used Emails</span>
                  <div className="group relative" onClick={(e) => e.stopPropagation()}>
                    <Info size={12} className="text-slate-400 cursor-help hover:text-blue-500 transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[100] shadow-xl leading-relaxed">
                      History is stored in your browser`&apos;`s local storage only. We do not gather or store any of your activity on our servers.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
                {isHistoryVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isHistoryVisible && (
                <div className="px-4 pb-4 pt-1 animate-in slide-in-from-top-1 duration-300">
                  <div className="flex flex-wrap gap-2">
                    {history.map((prefix) => (
                      <div
                        key={prefix}
                        className="group flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-3 pr-1 py-1 shadow-sm hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-200 animate-in zoom-in-95"
                      >
                        <button
                          onClick={() => {
                            handleReset();
                            setId(prefix);
                            setIsSubmitEnabled(true);
                            setTimeout(() => {
                              const form = document.querySelector('form');
                              if (form) form.requestSubmit();
                            }, 0);
                          }}
                          className="text-[10px] font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mr-1"
                        >
                          {prefix}
                        </button>
                        <button
                          onClick={() => removeFromHistory(prefix)}
                          className="p-0.5 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-300 hover:text-red-500 transition-colors"
                          title="Remove from history"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-2" data-inbox-list>
        <Card className="flex flex-col space-y-2 lg:w-1/3 w-full  p-4 rounded-md">
          <Card className="relative items-center flex gap-3 justify-center rounded-md ">
            <h3 className="text-2xl">Inbox</h3>
            <Loader
              className={isRefreshing ? "animate-spin" : ""}
              hidden={!isRefreshing}
            />
          </Card>
          <div className="text-center text-sm text-muted-foreground mb-2">
            <p className="text-red-500">  Emails auto-delete 12h after receipt</p>
          </div>
          <div className="flex flex-col overflow-y-auto gap-1 w-100 max-h-[calc(100vh-160px)] max-lg:max-h-[calc(90vh-160px)]">
            {emails && emails.length !== 0 ? (
              emails
                .slice()
                .map((email) => (
                  <button
                    key={email._id}
                    className={`p-2 rounded-lg border transition-colors duration-200 text-left ${activeTab === email._id
                      ? "bg-blue-50 border-blue-300 shadow-sm"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                    onClick={() => getemailcontentdata(email._id)}
                  >
                    {/* Header with sender and time */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Mail size={14} className="text-gray-500 flex-shrink-0" />
                        <p className="font-semibold text-xs text-gray-800 truncate">
                          {email.from.value[0].address || "Unknown Sender"}
                        </p>
                      </div>
                      <div className="flex items-center text-[10px] text-gray-500 flex-shrink-0">
                        <span className="flex items-center gap-1">
                          <Clock1 size={10} />
                          {timeAgo(email.date || email.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Subject line */}
                    <div className="pl-4">
                      <p className="text-xs text-gray-600 truncate leading-tight">
                        {email.subject || "No Subject"}
                      </p>
                    </div>
                  </button>
                ))
            ) : isLoading ? (
              <div className="flex flex-col items-center p-3">
                <Loader2Icon
                  size={48}
                  className={isRefreshing ? "animate-spin" : ""}
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
        </Card>

        <Card className="flex-grow lg:w-2/3 w-full p-2 sm:p-3 rounded-md" data-email-content>
          <div className="flex items-center justify-center py-2 ">
            <h3 className="text-base sm:text-lg font-semibold "> Email Content</h3>
          </div>
          {Object.keys(emailcontent).length !== 0 ? (
            <div className="space-y-3">
              {/* Compact header with subject */}
              <Card >
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                  <h4 className="font-semibold text-sm sm:text-base break-words text-gray-900 mb-2">
                    {emailcontent.subject}
                  </h4>

                  {/* Compact metadata in grid layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-700">From:</span>
                      <span className="truncate" title={emailcontent.from.value[0].address}>
                        {emailcontent.from.value[0].address}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-gray-700">Received:</span>
                      <span className="truncate" title={convertToLocalTime(emailcontent.date || emailcontent.createdAt)}>
                        {convertToLocalTime(emailcontent.date || emailcontent.createdAt) || "Unknown Date"}
                      </span>
                    </div>
                  </div>

                  {/* Compact yet user-friendly feedback section */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-600"> Feedback:</span>
                      <div className="flex items-center gap-1">
                        {/* Compact Good feedback button */}
                        <button
                          onClick={handleFeedback('good')}
                          disabled={feedbackLoading}
                          className={`group relative flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${feedbackLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
                            : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 hover:shadow-sm"
                            }`}
                          title="Helpful email"
                        >
                          <ThumbsUp
                            size={12}
                            className={`transition-colors duration-200 ${feedbackLoading
                              ? "text-gray-400"
                              : "text-green-600 group-hover:text-green-700"
                              }`}
                          />
                          <span>Good</span>
                          {/* Tooltip only on desktop */}
                          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 hidden sm:block">
                            Helpful
                          </div>
                        </button>

                        {/* Compact Report feedback button */}
                        <button
                          onClick={handleFeedback('bad')}
                          disabled={feedbackLoading}
                          className={`group relative flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${feedbackLoading
                            ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
                            : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 hover:shadow-sm"
                            }`}
                          title="Report issue"
                        >
                          <ThumbsDown
                            size={12}
                            className={`transition-colors duration-200 ${feedbackLoading
                              ? "text-gray-400"
                              : "text-red-600 group-hover:text-red-700"
                              }`}
                          />
                          <span>Issue</span>
                          {/* Tooltip only on desktop */}
                          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 hidden sm:block">
                            Report
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Compact loading state */}
                    {feedbackLoading && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs text-blue-700">Sending</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              {/* OTP Container */}
              {detectedOTP && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">Verification Code Detected</p>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-widest">{detectedOTP}</h4>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(detectedOTP)}
                    className="flex items-center gap-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-slate-700 transition shadow-sm active:scale-95"
                  >
                    <Copy size={16} />
                    Copy Code
                  </button>
                </div>
              )}
              {/* Content section with minimal spacing */}
              <div className="border-t border-gray-200 pt-2">
                <div className="w-full">
                  <iframe
                    src={emailIframeSrc}
                    className="w-full border border-gray-200 rounded-lg"
                    style={{
                      backgroundColor: 'white',
                      minHeight: '180px',
                      height: 'auto'
                    }}
                    sandbox="allow-same-origin allow-popups"
                    scrolling="no"
                    frameBorder="0"
                    title="Email Content"
                    onLoad={(e) => {
                      const iframe = e.target;

                      // Enhanced responsive height calculation
                      const setResponsiveHeight = () => {
                        try {
                          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

                          if (iframeDoc) {
                            // Wait for content to load and images to render
                            setTimeout(() => {
                              try {
                                const body = iframeDoc.body;
                                const html = iframeDoc.documentElement;

                                if (body) {
                                  // Ensure content fits width
                                  body.style.maxWidth = '100%';
                                  body.style.overflowX = 'hidden';
                                  body.style.overflowY = 'visible';
                                  body.style.wordWrap = 'break-word';
                                }

                                // Calculate actual content height
                                const contentHeight = Math.max(
                                  body ? body.scrollHeight : 0,
                                  body ? body.offsetHeight : 0,
                                  html ? html.scrollHeight : 0,
                                  html ? html.offsetHeight : 0,
                                  200 // minimum height
                                );

                                // Apply height with some padding
                                iframe.style.height = (contentHeight + 30) + 'px';
                              } catch (error) {
                                console.log('Could not calculate content height:', error);
                                iframe.style.height = getResponsiveFallbackHeight();
                              }
                            }, 150);
                          } else {
                            iframe.style.height = getResponsiveFallbackHeight();
                          }
                        } catch (error) {
                          console.log('Could not access iframe content:', error);
                          iframe.style.height = getResponsiveFallbackHeight();
                        }
                      };

                      // Responsive fallback height function
                      const getResponsiveFallbackHeight = () => {
                        if (typeof window === 'undefined') return '400px';

                        const width = window.innerWidth;
                        if (width < 480) return '250px';       // Mobile
                        if (width < 640) return '300px';       // Large mobile
                        if (width < 768) return '350px';       // Tablet portrait
                        if (width < 1024) return '400px';      // Tablet landscape
                        return '450px';                        // Desktop
                      };

                      // Initial height setting
                      setResponsiveHeight();

                      // Handle window resize for better responsiveness
                      const handleResize = () => {
                        iframe.style.height = getResponsiveFallbackHeight();
                        setTimeout(setResponsiveHeight, 100);
                      };

                      // Add resize listener
                      window.addEventListener('resize', handleResize);

                      // Store cleanup function
                      iframe.cleanup = () => {
                        window.removeEventListener('resize', handleResize);
                      };
                    }}
                    onError={() => {
                      console.log('Iframe failed to load, falling back to dangerouslySetInnerHTML');
                    }}
                    ref={(iframe) => {
                      // Cleanup on unmount
                      return () => {
                        if (iframe && iframe.cleanup) {
                          iframe.cleanup();
                        }
                      };
                    }}
                  />
                  {/* Fallback for when iframe fails or HTML content is missing */}
                  {(!emailIframeSrc || (!emailcontent.html && emailcontent.text)) && (
                    <div
                      className="rounded-lg p-4 sm:p-5 border border-gray-200 bg-white"
                      style={{
                        minHeight: '200px',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        lineHeight: '1.6',
                        fontSize: '14px',
                        color: '#334155'
                      }}
                    >
                      {emailcontent.html ? (
                        <div dangerouslySetInnerHTML={{ __html: decodeHtml(emailcontent.html) }} />
                      ) : (
                        <div className="font-mono text-sm">{emailcontent.text || "No content to display"}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-3 py-6 text-center border-t border-gray-200">
              <div className="mb-3">
                <MailX size={32} />
              </div>
              <div className="text-sm sm:text-base font-medium px-2">
                Select an email to view its content
              </div>
            </div>
          )}
        </Card>
      </div>
      <Card className="maincard rounded-lg shadow ">
        <div className="container mx-auto mb-2">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
            Temporary Email (Temp Mail) Made Simple with OD2
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
                  automatically deleted <strong>12 hours after being received</strong>,
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
                  <li>Space ( )</li>
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
            <Card className="shadow-lg rounded-lg p-5">
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
            </Card>

            <Card className="text-center py-12">
              <h2 className="text-3xl font-bold">Try It Now</h2>
              <p className="mt-4 text-lg">
                Ready to protect your inbox and maintain your privacy?
              </p>
              <a href="#" className="abtn inline-block">
                Get Started for Free
              </a>
            </Card>
            <Card className="shadow-lg rounded-lg p-6 mt-8">
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
            </Card>

            <Card className="shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold ">How It Works</h2>
              <ol className="list-decimal list-inside mt-4 space-y-2">
                <li>Visit our website.</li>
                <li>Instantly generate a disposable email address.</li>
                <li>
                  Copy and use your email for registrations or verifications.
                </li>
                <li>Receive emails in real-time and delete them when done.</li>
              </ol>
            </Card>

            <Card className="border shadow-lg rounded-lg p-6 mt-8">
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
                    No, temp mail is designed for short-term use. Each email is automatically deleted 12 hours after being received, ensuring
                    maximum security and privacy.
                  </p>
                </div>
              </div>
            </Card>
            <div style={{ border: '1px solid #ffe58f', borderRadius: 6, padding: 12, marginBottom: 16 }}>
              <strong>Note:</strong> The following email addresses are <span style={{ color: '#d4380d' }}>not allowed</span> as the local-part (before the <code>@</code>):<br />
              <span style={{ fontSize: '0.95em' }}>{RESERVED_EMAILS.join(', ')}</span><br />
              <span style={{ fontSize: '0.92em', color: '#ad6800' }}>
                Attempts to use these will result in an error: <em>&quot;Reserved email addresses are not allowed. Please use a different email address.&quot;</em>
              </span>
            </div>
            <Card className="border shadow-xl rounded-xl  text-center py-12">
              <h2 className="text-3xl font-bold">Secure Disposable Email Service</h2>
              <p className="mt-4 text-lg">
                Fast, Secure, and Hassle-Free Disposable Email for Everyone
              </p>
            </Card>

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
                <Card className="p-6 shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">
                    Secure Online Signups
                  </h3>
                  <p className="mt-2 ">
                    Use temporary mail for registrations on websites, forums, or
                    social media platforms without sharing your permanent email.
                  </p>
                </Card>
                <Card className="p-6 shadow-md rounded-md">
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
                </Card>
                <Card className="p-6  shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">
                    Testing and Development
                  </h3>
                  <p className="mt-2 ">
                    Ideal for developers and QA testers to test email workflows
                    without cluttering real accounts.
                  </p>
                </Card>
                <Card className="p-6  shadow-md rounded-md">
                  <h3 className="text-xl font-semibold ">Enhanced Privacy</h3>
                  <p className="mt-2 ">
                    Safeguard your identity while participating in online
                    surveys, polls, or giveaways.
                  </p>
                </Card>
              </div>
            </section>

            {/* Call-to-Action Section */}
          </div>
          <Card className="shadow-lg rounded-lg p-6 mt-8  text-center">
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
          </Card>
        </div>
      </Card>
    </div>
  );
}
