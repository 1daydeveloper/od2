import { NextResponse } from 'next/server';

export function middleware(request) {
//   const hostname = request.headers.get('host'); // e.g., 'tem.www.od2.in'
//   const url = request.nextUrl;

//   // Extract subdomain
//   const [subdomain] = hostname.split('.'); // "tem" in "tem.www.od2.in"
//   const mainDomain = 'www.od2.in'; // Update this to your domain

//   // Check if the request is for the "tem" subdomain
//   if (hostname !== mainDomain && subdomain === 'temp') {
//     // Keep assets and layouts intact while serving the page
//     url.pathname = `/temp-mail${url.pathname}`;
//     return NextResponse.rewrite(url);
//   }

  // Allow other requests to proceed
  return NextResponse.next();
}
