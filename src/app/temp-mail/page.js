"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ThumbsUp, ThumbsDown, Mail, Trash2Icon, Clock1, Copy, Loader, Loader2Icon, PencilLineIcon, MailX, Trash2, Clock } from "lucide-react";
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
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false); // Feedback state

  // Cleanup interval and blob URLs on component unmount
  useEffect(() => {
    return () => {
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
            }
          })
          .catch((err) => {
            // If retry is stopped, exit immediately
            // console.error("Error fetching emails:", err);
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
    const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false; // lg breakpoint
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

    // If attachments are not present or empty, return original decoded content with minimal responsive wrapper
    if (!attachments || attachments.length === 0) {
      return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { 
                margin: 0; 
                padding: 8px;
                max-width: 100%;
                overflow-x: hidden;
              }
              * {
                max-width: 100% !important;
                box-sizing: border-box !important;
              }
              img {
                max-width: 100% !important;
                height: auto !important;
              }
              table {
                width: 100% !important;
                max-width: 100% !important;
              }
            </style>
          </head>
          <body>
            ${decodedContent}
          </body>
        </html>
      `;
    }

    // Create a mapping of CID to data URL for attachments only
    const cidMap = attachments.reduce((map, attachment) => {
      if (attachment.cid) {
        const dataUrl = `data:${attachment.contentType};base64,${attachment.content}`;
        map[attachment.cid] = dataUrl;
      }
      return map;
    }, {});

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
              padding: 8px;
              max-width: 100%;
              overflow-x: hidden;
            }
            * {
              max-width: 100% !important;
              box-sizing: border-box !important;
            }
            img {
              max-width: 100% !important;
              height: auto !important;
            }
            table {
              width: 100% !important;
              max-width: 100% !important;
            }
          </style>
        </head>
        <body>
          ${updatedContent}
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
  const copyToClipboard = () => {
    if (!navigator.clipboard) {
      toast.error("Clipboard not supported on this browser");
    } else {
      navigator.clipboard.writeText(id + "@tm.od2.in");
      toast.success("Email Copied!");
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
    if (type === "bad") {
      description = typeof window !== 'undefined' ? window.prompt("Please provide a description (optional):", "") : "";
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
            className={`absolute right-1 top-1 py-1 px-2.5 border border-transparent text-center text-sm  shadow-sm hover:shadow  focus:shadow-none ${
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

      <div className="flex flex-col lg:flex-row gap-2">
        <Card className="flex flex-col space-y-2 lg:w-1/3 w-full  p-4 rounded-md">
          <Card className="relative items-center flex gap-3 justify-center rounded-md ">
            <h3 className="text-2xl">Inbox</h3>
            <Loader
              style={{
                animation: isRefreshing ? "spin 1s linear infinite" : "none",
              }}
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
                .reverse()
                .map((email) => (
                  <button
                    key={email._id}
                    className={`p-2 rounded-lg border transition-colors duration-200 text-left ${
                      activeTab === email._id
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
                          <Clock1 size={10}/>
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
        </Card>

        <Card className="flex-grow lg:w-2/3 w-full p-2 sm:p-3 rounded-md" data-email-content>
          <div className="flex items-center justify-center py-2 ">
            <h3 className="text-base sm:text-lg font-semibold "> Email Content</h3>
          </div>
            {Object.keys(emailcontent).length !== 0 ? (
              <div className="space-y-2">
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
                          className={`group relative flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                            feedbackLoading 
                              ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400" 
                              : "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 hover:shadow-sm"
                          }`}
                          title="Helpful email"
                        >
                          <ThumbsUp
                            size={12}
                            className={`transition-colors duration-200 ${
                              feedbackLoading 
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
                          className={`group relative flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                            feedbackLoading 
                              ? "opacity-50 cursor-not-allowed bg-gray-50 text-gray-400" 
                              : "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 hover:shadow-sm"
                          }`}
                          title="Report issue"
                        >
                          <ThumbsDown
                            size={12}
                            className={`transition-colors duration-200 ${
                              feedbackLoading 
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
                  {/* Fallback for when iframe fails */}
                  {!emailIframeSrc && (
                    <div
                      className="rounded-lg p-3 sm:p-4 lg:p-5 mb-4 border border-gray-200 bg-white"
                      style={{ 
                        minHeight: (() => {
                          if (typeof window === 'undefined') return '400px';
                          const width = window.innerWidth;
                          if (width < 480) return '250px';
                          if (width < 640) return '300px';
                          if (width < 768) return '350px';
                          if (width < 1024) return '400px';
                          return '450px';
                        })(),
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: '1.6',
                        fontSize: (() => {
                          if (typeof window === 'undefined') return '14px';
                          const width = window.innerWidth;
                          if (width < 480) return '12px';
                          if (width < 640) return '13px';
                          return '14px';
                        })()
                      }}
                      dangerouslySetInnerHTML={{
                        __html: decodeHtml(emailcontent.html),
                      }}
                    />
                  )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-3 py-6 text-center border-t border-gray-200">
                <div className="mb-3">
                  <MailX size={32}  />
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
            <Card className="border shadow-xl rounded-xl  text-center py-12">
              <h1 className="text-4xl font-bold">Temporary Email Service</h1>
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
