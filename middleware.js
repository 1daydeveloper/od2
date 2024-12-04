import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host'); // Gets the incoming hostname

  // Check if the request comes from the 'temp.' subdomain
  if (host && host.startsWith('temp.')) {
    url.pathname = '/tmail'; // Rewrite to /tmail page
    return NextResponse.rewrite(url);
  }

  // Allow other requests to proceed as normal
  return NextResponse.next();
}
