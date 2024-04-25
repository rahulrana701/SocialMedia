import { NextRequest, NextResponse } from "next/server";
import { User } from "db";
import { authenticate } from "middlewares";

export async function GET(request: NextRequest, { params }: any) {
  const isAuthenticated = await authenticate(request);

  if (!isAuthenticated) {
    return;
  }
  const otherUserId = params;

  const otheruserdata = await User.findById({ _id: otherUserId });
  if (!otheruserdata) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "could not found user",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "user found",
    otheruserdata,
  });
}
