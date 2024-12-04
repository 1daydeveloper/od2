import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host'); // e.g., 'tem.od2.in'
  const url = request.nextUrl;

  // Extract subdomain
  const [subdomain] = hostname.split('.'); // "tem" in "tem.od2.in"
  const mainDomain = 'od2.in'; // Update this to your domain

  // Check if the request is for the "tem" subdomain
  if (hostname !== mainDomain && subdomain === 'temp') {
    // Rewrite to a specific page (e.g., "/tem-page")
    url.pathname = '/tmail'; // Change to your desired path
    return NextResponse.rewrite(url);
  }

  // Allow other requests to proceed
  return NextResponse.next();
}
