// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host');

  if (host.startsWith('temp.')) {
    // Redirect to the temp-mail page for the subdomain
    url.pathname = '/tmail';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}
