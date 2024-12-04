"use client";
import styles from "../../styles/mainpage.module.css";
import { useEffect, useState, React } from "react";

const Mainpage = () => {
  const [openCollapseIndex, setOpenCollapseIndex] = useState(null); // Track which collapse is open

  const collapseData = [
    {
      title: "What We Offer?",
      content:
        "We provide innovative software solutions tailored to your business needs.",
    },
    {
      title: "Our Mission",
      content:
        "Our mission is to deliver high-quality products with maximum customer satisfaction on time with effective retention.",
    },
    {
      title: "Contact Us",
      content:
        "Reach us on  call us at +91 7010178914.",
    },
  ];

  const toggleCollapse = (index) => {
    setOpenCollapseIndex(openCollapseIndex === index ? null : index); // Open/close the collapse
  };

  const DownArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 9l-7.5 7.5L4.5 9"
      />
    </svg>
  );

  const UpArrow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 15l7.5-7.5L19.5 15"
      />
    </svg>
  );

  return (
    <div className={"grid gap-3"}>
      {" "}
      <div className={"flex-row"}>
        <section className="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
            <a
              href="/tmail"
              className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
            >
              <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">
                New
              </span>{" "}
              <span className="text-sm font-medium">
                New Temp Mail System is Lached Check that Now!
              </span>
              <svg
                className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              We invest in the Time
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
              We invest time to deliver value, ensuring lasting impact and
              growth with every effort we make.
            </p>
            <div className={"inline-flex"}>
              <a href="https://www.instagram.com/onedaydevelopers/">
                <svg
                  className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCtgc_t09aTJUxYTu4CAaBAA">
                <svg
                  className="w-[40px] h-[40px] text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
      <div className={"flex justify-between"}>
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
              clipRule="evenodd"
            />
          </svg>

          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              We Advertise
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Boost your brand with targeted advertising solutions designed to
            engage, attract, and grow your business.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get Popular!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
            />
          </svg>

          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              We Develop
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            We develop innovative solutions to transform ideas into reality,
            delivering excellence for every project we undertake.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Let Us Start!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>

        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <svg
            className="w-[40px] h-[40px] text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11 4.717c-2.286-.58-4.16-.756-7.045-.71A1.99 1.99 0 0 0 2 6v11c0 1.133.934 2.022 2.044 2.007 2.759-.038 4.5.16 6.956.791V4.717Zm2 15.081c2.456-.631 4.198-.829 6.956-.791A2.013 2.013 0 0 0 22 16.999V6a1.99 1.99 0 0 0-1.955-1.993c-2.885-.046-4.76.13-7.045.71v15.081Z"
              clipRule="evenodd"
            />
          </svg>

          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Our Products
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Our products combine quality, innovation, and reliability to meet
            the needs of modern businesses and consumers.
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Check Out!
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div></div>
      </div>
      <div>
        <div className="flex flex-col items-center  p-4">
          <h1 className="text-3xl font-bold mb-6 bg-gray-950 p-3 rounded-3xl">Who We Are!</h1>
          <div className="w-full max-w">
            {collapseData.map((item, index) => (
              <div
                key={index}
                className="w-full border rounded-lg shadow-sm my-2"
              >
                <button
                  onClick={() => toggleCollapse(index)}
                  className="flex justify-between items-center w-full p-4 hover:border-headfoot_color focus:outline-none"
                >
                  <span className="text-lg font-medium">{item.title}</span>
                  {openCollapseIndex === index ? <UpArrow /> : <DownArrow />}
                </button>

                {openCollapseIndex === index && (
                  <div className="p-4 bg-white border-t">
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
