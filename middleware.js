import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = ["/login", "/register", "/api/public"];

export async function middleware(req) {
  const { pathname } = req.nextUrl;


  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;


  const authHeader = req.headers.get("authorization");
  const headerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const finalToken = token || headerToken;

  if (!finalToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let decoded;
  try {
    decoded = jwt.verify(finalToken, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Invalid Token:", error.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }


  const route = pathname;

  if (route.startsWith("/COD")) {
    const isDefault = await checkPermission(decoded.userId, "default");

    if (!isDefault) {
      return NextResponse.redirect(new URL("/Login", req.url));
    }
  }


  if (route.startsWith("/ai")) {
    const hasAi = await checkPermission(decoded.userId, "ai");

    if (!hasAi) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
}


async function checkPermission(userId, permission) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/permissions/${userId}`);
  const data = await res.json();

  return data.permissions?.includes(permission);
}
