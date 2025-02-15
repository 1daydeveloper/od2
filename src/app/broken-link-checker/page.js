"use client";

import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState("");
  const [urlFilter, setUrlFilter] = useState("");
  const [statusCodeFilter, setStatusCodeFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [scanOption, setScanOption] = useState("single");
  const [totalLinks, setTotalLinks] = useState(0);
  const [scannedLinks, setScannedLinks] = useState(0);
  const controllerRef = useRef(null);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCheckLinks = async () => {
    if (!validateUrl(url)) {
      setUrlError("Please enter a valid URL.");
      return;
    }
    setUrlError("");
    setLoading(true);
    setError("");
    setResults([]);
    controllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/check-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, scanOption }),
        signal: controllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const { brokenLinks, totalLinks, scannedLinks } = await response.json();
      setResults(brokenLinks);
      setTotalLinks(totalLinks);
      setScannedLinks(scannedLinks);

      if (brokenLinks.length === 0) {
        toast.success(`No broken links found! Scanned ${scannedLinks} links.`);
      } else {
        toast.info(`${brokenLinks.length} broken link(s) found!`);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        toast.info("Scanning stopped.");
      } else {
        setError(err.message);
        toast.error("Failed to check links.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStopScan = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  };

  const filteredResults = results.filter(
    (link) =>
      link.url.includes(urlFilter) &&
      link.statusCode.toString().includes(statusCodeFilter) &&
      link.source.includes(sourceFilter)
  );

  return (
    <div className="rounded-2xl shadow-lg p-8">
      <h1 className="text-2xl font-bold  text-center mb-6">
        Free Broken Link Checker
      </h1>
      <div className="space-y-4">
        <input
          type="url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setUrlError("");
          }}
          placeholder="Enter a URL (e.g., https://example.com)"
          className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 "
        />
        {urlError && <p className="mt-2 text-red-500">{urlError}</p>}
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="single"
              checked={scanOption === "single"}
              onChange={() => setScanOption("single")}
              className="mr-2"
            />
            Single Page
          </label>
          {/* <label className="flex items-center">
            <input
              type="radio"
              value="whole"
              checked={scanOption === "whole"}
              onChange={() => setScanOption("whole")}
              className="mr-2"
            />
            Whole Site
          </label> */}
          <label className="flex items-center">
            <input
              type="radio"
              value="sitemap"
              checked={scanOption === "sitemap"}
              onChange={() => setScanOption("sitemap")}
              className="mr-2"
            />
            check the link in Sitemap
          </label>
        </div>
        {loading && (    <p className="text-sm text-gray-600 bg-gray-100 border-l-4 border-blue-500 p-3 rounded-md shadow-sm">
          <span className="font-semibold">Note:</span> Checking links may take a
          few seconds to minutes, depending on the number of links. Please be
          patient.
        </p>)}

        <div className="flex space-x-4">
          <button
            onClick={handleCheckLinks}
            disabled={loading || !url}
            className="w-full font-semibold p-3 rounded-lg flex justify-center items-center"
          >
            {loading ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 animate-spin mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                    clipRule="evenodd"
                  />
                </svg>
                Scanning...
              </>
            ) : (
              "Check for Broken Links"
            )}
          </button>
          {loading && (
            <button
              onClick={handleStopScan}
              className="w-full font-semibold p-3 rounded-lg flex justify-center items-center bg-red-500 text-white"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Broken Links</h2>
          <p className="py-3 text-green-500">
            Total Links: {totalLinks}, Scanned Links: {scannedLinks} <br></br>{" "}
            <span className="text-red-500">
              {" "}
              {results.length} broken link&apos;s found!(
              <a href="#download-csv" class="scroll-down">
                📜⏬ Scroll Down to Download as CSV
              </a>{" "}
            </span>
            )
          </p>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              value={urlFilter}
              onChange={(e) => setUrlFilter(e.target.value)}
              placeholder="Filter by URL"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            <input
              type="text"
              value={statusCodeFilter}
              onChange={(e) => setStatusCodeFilter(e.target.value)}
              placeholder="Filter by Status Code"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
            <input
              type="text"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              placeholder="Filter by Source"
              className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2"
            />
          </div>

          <div className="flex flex-col overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">URL</th>
                  <th className="px-4 py-2">Status Code</th>
                  <th className="px-4 py-2">Source</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.map((link, idx) => (
                  <tr key={idx} className="bg-red-100 border-b">
                    <td className="px-4 py-2">
                      <a
                        href={link.url}
                        className="text-red-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.url}
                      </a>
                    </td>
                    <td className="px-4 py-2">{link.statusCode}</td>
                    <td className="px-4 py-2">
                      <a
                        href={link.source}
                        className="text-blue-500 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.source}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CSVLink
            data={filteredResults}
            headers={[
              { label: "URL", key: "url" },
              { label: "Status Code", key: "statusCode" },
              { label: "Source", key: "source" },
            ]}
            filename="od2-broken-links.csv"
            className="abtn mt-4 inline-block p-2 rounded"
            id="download-csv"
          >
            Download CSV
          </CSVLink>
        </div>
      )}
      {results.length === 0 && scannedLinks > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">No Broken Links Found</h2>
          <p className="py-3 text-green-500">
            Total Links: {totalLinks}, Scanned Links: {scannedLinks}
          </p>
        </div>
      )}
      <div className="maincard rounded-lg shadow mt-8">
        <div className="container mx-auto mb-2">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            Ensure Your Websites Integrity with Our Broken Link Checker
          </h2>
          <p className="text-lg text-center mb-8">
            Use our <strong>Broken Link Checker</strong> to identify and fix
            broken links on your website, enhancing user experience and SEO
            performance.
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="mb-3">
              <h2 className="text-2xl font-semibold mb-4">
                Why Use Our Broken Link Checker?
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Improve SEO:</strong> Fixing broken links can help
                  improve your websites search engine ranking.
                </li>
                <li>
                  <strong>Enhance User Experience:</strong> Ensure visitors have
                  a smooth browsing experience without encountering dead links.
                </li>
                <li>
                  <strong>Easy to Use:</strong> Simply enter your URL and let
                  our tool do the rest.
                </li>
                <li>
                  <strong>Comprehensive Reports:</strong> Get detailed reports
                  on broken links, including their source and status codes.
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Perfect For:</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Website Owners:</strong> Maintain the integrity of
                  your site by regularly checking for broken links.
                </li>
                <li>
                  <strong>SEO Professionals:</strong> Enhance your SEO efforts
                  by ensuring all links on your site are functional.
                </li>
                <li>
                  <strong>Developers:</strong> Quickly identify and fix broken
                  links during the development process.
                </li>
              </ul>
            </div>
          </div>
          <section className="card text-center py-12 my-2">
            <h2 className="text-3xl font-bold">Try It Now</h2>
            <p className="mt-4 text-lg">
              Ready to improve your websites performance and user experience?
            </p>
            <a href="#" className="abtn inline-block">
              Check for Broken Links
            </a>
          </section>
          <div className="flex flex-col gap-3">
            <section className="card shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold">
                Benefits of Using a Broken Link Checker
              </h2>
              <p className="mt-4">
                Regularly checking for broken links helps you:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2">
                <li>Maintain a professional and functional website.</li>
                <li>Improve your sites SEO ranking.</li>
                <li>Enhance user experience by avoiding dead links.</li>
              </ul>
            </section>
            <section className="card shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold">How It Works</h2>
              <ol className="list-decimal list-inside mt-4 space-y-2">
                <li>Enter your website URL.</li>
                <li>
                  Click on <b>Check for Broken Links</b>.
                </li>
                <li>Receive a detailed report of broken links.</li>
                <li>Fix the broken links to improve your site.</li>
              </ol>
            </section>
            <section className="card border shadow-lg rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-bold">
                FAQs About Broken Link Checker
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-bold">What is a broken link?</h3>
                  <p>
                    A broken link is a hyperlink that no longer works because
                    the destination web page has been moved or deleted.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">
                    Why should I check for broken links?
                  </h3>
                  <p>
                    Checking for broken links helps maintain your websites
                    functionality, improves SEO, and enhances user experience.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Is this service free?</h3>
                  <p>Yes, our broken link checker is 100% free to use.</p>
                </div>
              </div>
            </section>
            <section className="card border shadow-xl rounded-xl text-center py-12">
              <h1 className="text-4xl font-bold">
                Broken Link Checker Service
              </h1>
              <p className="mt-4 text-lg">
                Fast, Reliable, and Easy-to-Use Broken Link Checker for Everyone
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
