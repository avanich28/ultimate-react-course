/*import { NextResponse } from "next/server";

// Topic: Protecting Routes With NextAuth Middleware
// NOTE Middleware runs every single route

export function middleware(request) {
  console.log(request);

  // NOTE By default, middleware runs for every single route. Then, we get too many redirects errors which creates infinite loop. -> Stop by creating the matcher 
  // NOTE If not log-in, the site will redirect to /about.
  return NextResponse.redirect(new URL("/about", request.url));
}*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"], // NOTE If not log-in, the site will redirect callback. (http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Faccount)
};
