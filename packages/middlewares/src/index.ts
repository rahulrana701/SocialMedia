import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const jwtsecret = process.env.DB_JWTSECRET || "default_secret";

export const authenticate = async (req: NextRequest) => {
  const authHeader = req.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (!token) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "Please login or sign up correctly",
      });
    }

    try {
      const decoded = jwt.verify(token, jwtsecret);

      if (!decoded || typeof decoded === "string") {
        return NextResponse.json({
          status: 403,
          success: false,
          message: "Please login or sign up correctly",
        });
      }

      req.headers.set("UserId", decoded.UserId);
      return true;
    } catch (err) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "Please login or sign up correctly",
      });
    }
  } else {
    return NextResponse.json({
      staus: 403,
      success: false,
      message: "Please login or sign up correctly",
    });
  }
};
