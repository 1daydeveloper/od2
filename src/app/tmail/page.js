"use client";
import React, { useState } from "react";

export default function GetEmailByID() {
  const [id, setId] = useState("");
  const [emails, setEmails] = useState([]);
  const [activeTab, setActiveTab] = useState(null); // To track the active tab
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [enablesubmitbtn, setEnablesubmitbtn] = useState(true); // To track the active email

  const handleSubmit = async (e) => {
    e.preventDefault();

    const retryFetch = (attempts = 3) => {
      setError(""); // Reset the error message
      setIsLoading(true); // Set loading to true when fetching
      setEnablesubmitbtn(false);
      fetch(`/api/get-email/?id=${id}`)
        .then((response) => response.json())
        .then((data, response) => {
          if (data.length === 0 && attempts > 0) {
            setError(
              "No Emails Found We Refreshing the Email 3 out of Attempt:"+attempts
            );            setTimeout(() => retryFetch(attempts - 1), 10000); // Retry after 3 seconds
          } else if (attempts <= 0) {
            setEnablesubmitbtn(true);

            setError(
              "Failed to fetch emails after 3 attempts, please try submitting again."
            );
            setIsLoading(false); // Stop loading if max attempts are exhausted
          } else {
            setEnablesubmitbtn(true);

            // Successfully fetched data, no need for retry
            setIsLoading(false); // Set loading to false when fetch is done
            setEmails(data);
            console.log(data);
            setActiveTab(data[0]?._id || null); // Set the first email as the active tab
          }
        })
        .catch((err) => {
          console.error(err);
          setError("An error occurred while fetching emails");
          setIsLoading(false); // Stop loading if an error occurs
        });
    };

    // Call the function to start the process
    retryFetch();
  };

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
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
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Get Email by ID</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID (e.g., jk)"
            required
            disabled={!enablesubmitbtn}
            className="px-4 py-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!enablesubmitbtn}
            className={`${enablesubmitbtn?"bg-yellow-600":"bg-gray-300"}  text-black px-4 py-2 rounded-md hover:bg-white transition`}
          >
            Get Temp Mail
          </button>
          <button
            className="bg-yellow-600 text-black px-4 py-2 rounded-md hover:bg-white transition"
            onClick={() => alert("ho")}
          >
            Refresh
          </button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isLoading ? (
        // Loading Spinner
        <div className="flex justify-center items-center flex-col">
          <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <div>
            <p className="text-dark">Waiting for the First eMail</p>
          </div>
        </div>
      ) : emails && emails.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Tabs */}
          <div className="flex flex-col space-y-2">
            {emails.map((email) => (
              <button
                key={email._id}
                className={`px-1 py-1 rounded-md shadow  ${
                  activeTab === email._id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                }`}
                onClick={() => setActiveTab(email._id)} // Update the active tab
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
                    <h6 className="font-bold">
                      {email.from.value[0].address || "Untitled Email"}
                    </h6>
                    <h7 className="">
                      {timeAgo(email.date)|| "Untitled Email"}
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

          {/* Content */}
          <div className="flex-grow space-y-4 text-black bg-gray-100 rounded-md">
            {emails.map((email) => (
              <div
                key={`content-${email._id}`}
                className={`p-4 rounded-md ${
                  activeTab === email._id ? "block" : "hidden"
                }`} // Show only if the tab is active
              >
                <div className="rounded p-1 mb-4 overflow-hidden bg-slate-200 shadow-xl">
                  <div className="px-2 py-4">
                    <div className="font-bold text-xl">{email.subject}</div>
                  </div>
                  <div>
                    <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                      <p>
                        <strong>From:</strong> {email.from.value[0].address}
                      </p>
                    </span>
                    <span className="inline-block bg-gray-800 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2">
                      <p>
                        <strong>Recived Date:</strong>                       {convertToLocalTime(email.date) || "Untitled Email"}

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
                      __html: decodeHtml(email.html),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-yellow-500">
          Entera subscript of email to Tailor your Temp email {id}@tm.od2.in
        </p>
      )}
    </div>
  );
}
