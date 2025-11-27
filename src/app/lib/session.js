import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function findSession(isRedirect = true) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    if (isRedirect) redirect("/Login");
    return null;
  }

  // Decode the JWT
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (isRedirect) redirect("/Login");
    return null;
  }

  // decoded = { userId: "xxxx", iat: ..., exp: ... }
  return {
    userId: decoded.userId,
  };
}
