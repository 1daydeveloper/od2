"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function Error({ statusCode, err }) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Something went wrong.</h1>
        <p className="text-gray-600 mb-4">
          {statusCode
            ? `An error ${statusCode} occurred on server.`
            : "An error occurred on client."}
        </p>
        <Button
          onClick={() => router.back()}
          variant="link"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}

// This handles both server-side and client-side error rendering
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode, err };
};

export default Error;
