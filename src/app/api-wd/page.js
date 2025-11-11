"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";

export default function APIWDPage() {
  // Track page view on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: 'API Workflow Designer',
        page_location: window.location.href,
        event_category: 'api_workflow_designer',
        event_label: 'main_page_loaded'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Links */}
   
      
      <WorkflowBuilder />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
