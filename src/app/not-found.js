// app/not-found.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Log the 404 error or perform other side effects if needed
  }, []);

  return (
    <main className="bg-card border-card_border  place-items-center bg-clip-padding  p-8 flex flex-col w-full items-center justify-center  border-2 border-dashed rounded-lg cursor-pointer   ">
      <div className="text-center">
        <h2 className="text-3xl text-error">404</h2>
        <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Page not found
        </h3>
        <p className="mt-6 text-base leading-7">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md px-3.5 py-2.5 text-sm font-semiboldshadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            Go back home
          </a>
          <a href="/about" className="text-sm font-semibold ">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}
