import { NextResponse } from "next/server";
import { auth as middleware } from "@/lib/auth";

// const publicRoutes = ["/"];

const authRoutes = ["/login", "/signup"];

const protectedRoutes = ["/new", "/profile"];

export default middleware((req) => {
  const session = req.auth;

  const { pathname } = req.nextUrl;

  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
