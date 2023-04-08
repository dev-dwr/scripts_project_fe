import { NextResponse } from 'next/server';

export function middleware(request) {
  const isLoggedIn = request.cookies.accessToken;
  const url = request.url;

  if (isLoggedIn && url.includes('/login')) {
    return NextResponse.redirect("/");
  }
  if (isLoggedIn && url.includes('/register')) {
    return NextResponse.redirect("/");
  }
  if (isLoggedIn && url.includes('/offer/newoffer')) {
    return NextResponse.redirect("/login");
  }
}

