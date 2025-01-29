import { NextResponse } from "next/server";
import { auth as middleware } from "@/lib/auth";

const publicRoutes = ["/"];

const authRoutes = ["/login", "signup"];

const protectedRoutes = ["/new"];

export default middleware((req) => {
  const session = req.auth;

  const { pathname } = req.nextUrl;

  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (session && authRoutes.some((route) => pathname.startsWith(route))) {
    console.log("BASE URL", req.url);
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log(session);

  if (!session && protectedRoutes.some((route) => pathname.startsWith(route))) {
    console.log("BASE URL", req.url);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});
