import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const jwtsecret = process.env.DB_JWTSECRET || "default_secret";

export const nextjsauthentication = async (request: NextRequest) => {
  const authorization = request.headers.get("authorization");

  if (authorization || authorization?.startsWith("Bearer")) {
    const token = authorization?.split(" ")[1];
    if (!token) {
      NextResponse.json({ status: 403, message: "Login or Signup Correctly" });
      return;
    }
    try {
      Jwt.verify(token, jwtsecret, (err, decoded) => {
        if (err) {
          NextResponse.json({
            status: 403,
            message: "Please login or Signup Correctly",
          });
          return;
        }
        if (!decoded) {
          NextResponse.json({
            status: 403,
            message: "Please login or Signup Correctly",
          });
          return;
        }

        if (typeof decoded == "string") {
          NextResponse.json({
            status: 403,
            message: "Please login or Signup Correctly",
          });
          return;
        }

        request.headers.set("UserId", decoded.UserId);
        return NextResponse.redirect(new URL("/api/User/alluser", request.url));
      });
    } catch (error) {
      return NextResponse.redirect(new URL("/api/User/login", request.url));
    }
  }

  return NextResponse.redirect(new URL("/api/User/login", request.url));
};

export const config = {
  matcher: ["/api/Post/:path*"],
};
