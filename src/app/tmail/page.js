"use client";
import React, { useState } from "react";
export default function GetEmailByID() {
  const [id, setId] = useState("");
  const [emails, setEmails] = useState([]);
  const [emailcontent, setEmailContent] = useState({});
  const [activeTab, setActiveTab] = useState(null); // To track the active tab
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [intervalId, SetIntervalId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    console.log(emailid);
    console.log(emails.find((email) => email._id === emailid));
    setEmailContent(emails.find((email) => email._id === emailid));
  }
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  function handleInputChange(e) {
    const inputText = e.target.value.toLowerCase(); // To small caps
    setId(inputText);
    gtag("event", "button_click", {
      event_category: "engagement",
      event_label: "Temp_Mail_Click",
      value: inputText,
    });
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(id+"@tm.od2.in");
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

  return (
    <div className="flex flex-col gap-4 min-h-screen ">
      <h1 className="text-2xl font-bold mb-4">
      Enter your email prefix (we will add @tm.od2.in for you)
        <span className="m-3 inline-block px-2 py-1 text-xl font-semibold text-white bg-yellow-500 rounded-full">
          Beta
        </span>
      </h1>
      <form onSubmit={handleSubmit} >
        <div className="md:flex-col relative min-w-20 items-center space-x-2">
          <input
            type="text"
            value={id}
            onChange={handleInputChange}
            autoComplete="off"
            required
            class="w-full bg-transparent h-10 placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pr-6 pl-10 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Enter your email prefix/Username (we will add @tm.od2.in for you)"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-7 absolute left-1 top-1  items-center"
          >
            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
          </svg>

          <button
            className={`absolute right-1 top-1 rounded justify-center items-center bg-yellow-600  py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow  focus:shadow-none hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="submit"
          >
            Check Inbox
          </button>

         
        </div>
      </form>
      <div className=" p-3 rounded-md flex items-center justify-between"><p>
      Email:<span className="text-yellow-400"> {id}@tm.od2.in</span></p>
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Copy
          </button>
        </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div class="flex flex-col lg:flex-row gap-2 text-black">
        <div class="flex flex-col space-y-2 lg:w-1/3 w-full bg-gray-200 p-4 rounded-md">
          <div class="relative items-center flex justify-center text-white rounded-md bg-slate-800">
            <h3 class="text-2xl">Inbox</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 absolute right-1"
              style={{
                animation: isRefreshing ? "spin 1s linear infinite" : "none", // Spin when refreshing
              }}
              hidden={!isRefreshing}
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <div class="flex flex-col overflow-y-auto gap-2 w-100 max-h-[calc(100vh-180px)] max-lg:max-h-[calc(60vh-180px)]">
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
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    } 	`}
                    onClick={() => getemailcontentdata(email._id)} // Update the active tab
                  >
                    <div className="flex flex-row gap-3">
                      <div className="w-30">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-6"
                        >
                          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                      </div>
                      <div className="text-start">
                        <h6 className="font-bold md:text-sm">
                          {email.from.value[0].address || "Untitled Email"}
                        </h6>
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
                <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-11"
              style={{
                animation: isRefreshing ? "spin 1s linear infinite" : "none", // Spin when refreshing
              }}
            >
              <path
                fillRule="evenodd"
                d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                clipRule="evenodd"
              />
            </svg>
                <div>
                  <p className="text-dark text-center">
                    Waiting for the First Mail to Touch our Inbox
                  </p>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={stopRetry}
                    className={`bg-yellow-600 text-black md:p-3 px-4 m-3 py-2 rounded-md hover:bg-white transition`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-2 py-4 text-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-12"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                  </svg>
                </div>

                <div className="font-bold text-xl mt-4">
                Enter your email prefix (we will add @tm.od2.in for you)                </div>
              </div>
            )}
          </div>
        </div>

        <div class="flex-grow lg:w-2/3 w-full space-y-4 text-black bg-gray-100 p-4 rounded-md">
          <div class=" items-center flex justify-center text-white rounded-md bg-slate-800">
            <h3 class="text-2xl">Email Content</h3>
          </div>{" "}
          <div class="overflow-y-auto max-h-[calc(100vh-180px)] max-lg:max-h-[calc(60vh-180px)]">
            {Object.keys(emailcontent).length !== 0 ? (
              <div>
                <div className="rounded p-1 mb-4 overflow-hidden bg-slate-200 shadow-xl">
                  <div className="px-2 py-4">
                    <div className="font-bold text-xl">
                      {emailcontent.subject}
                    </div>
                  </div>
                  <div>
                    <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                      <p>
                        <strong>From:</strong>{" "}
                        {emailcontent.from.value[0].address}
                      </p>
                    </span>
                    <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                      <p>
                        <strong>Recived Date:</strong>{" "}
                        {convertToLocalTime(emailcontent.date) ||
                          "Untitled Email"}
                      </p>
                    </span>
                  </div>
                </div>
                <p>
                  <strong>Content:</strong>
                </p>
                <div>
                  <div
                    className="rounded p-1 mb-4 overflow-hidden bg-slate-200 shadow-xl"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(emailcontent.html),
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-2 py-4 text-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-12"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>

                <div className="font-bold text-xl mt-4">
                  Select an Email Recived To Show the content of an email.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {isLoading ? (
        // Loading Spinner
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <div>
            <p className="text-dark">Waiting for the First eMail</p>
          </div>
          <div>
            <button
              type="submit"
              onClick={stopRetry}
              hidden={enablesubmitbtn}
              className={`bg-yellow-600 text-black md:p-3 px-4 m-3 py-2 rounded-md hover:bg-white transition`}
            >
              Cancel
            </button>
          </div>
          </div>
      ) : emails && emails.length > 0 ? (
            {emails.map((email) => (
              <button
                key={email._id}
                className={`px-1 py-1 rounded-md shadow  ${
                  activeTab === email._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                onClick={() => getemailcontentdata(email._id)} // Update the active tab
              >
                <div className="flex flex-row">
                  <div className="w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm8 6.25L4.97 6H19.03L12 10.25zM4 18h16V8l-8 5L4 8v10z" />
                    </svg>
                  </div>
                  <div className="text-start">
                    <h6 className="font-bold md:text-sm">
                      {email.from.value[0].address || "Untitled Email"}
                    </h6>
                    <h7 className="">
                      {timeAgo(email.date) || "Untitled Email"}
                    </h7>
                  </div>
                </div>

                <div className="flex flex-row">
                  <div className="w-10"> </div>
                  <div className="inline-flex text-start">
                    {email.subject || "Untitled Email"}
                  </div>
                </div>
              </button>
            ))}
          </div>
      ) : (
        <p className="text-yellow-500">
          Entera subscript of email to Tailor your Temp email {id}@tm.od2.in
        </p>
      )}

      {Object.keys(emailcontent).length !== 0 ? (
        <div>
          <div className="rounded p-1 mb-4 overflow-hidden bg-slate-200 shadow-xl">
            <div className="px-2 py-4">
              <div className="font-bold text-xl">{emailcontent.subject}</div>
            </div>
            <div>
              <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                <p>
                  <strong>From:</strong> {emailcontent.from.value[0].address}
                </p>
              </span>
              <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                <p>
                  <strong>Recived Date:</strong>{" "}
                  {convertToLocalTime(emailcontent.date) || "Untitled Email"}
                </p>
              </span>
            </div>
          </div>
          <p>
            <strong>Content:</strong>
          </p>
          <div>
            <div
              className="rounded p-1 mb-4 overflow-hidden bg-slate-200 shadow-xl"
              dangerouslySetInnerHTML={{
                __html: decodeHtml(emailcontent.html),
              }}
            />
          </div>
        </div>
      ) : (
        <p>No EMAIL FOUND</p>
      )} */}
    </div>
  );
}
