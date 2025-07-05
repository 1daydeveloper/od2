"use client";
import React from "react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WorkflowBuilder from "@/components/workflow/WorkflowBuilder";

export default function APIWDPage() {
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
