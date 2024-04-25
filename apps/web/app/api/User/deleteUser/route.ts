import { NextRequest, NextResponse } from "next/server";
import { User } from "db";
import { authenticate } from "middlewares";

export const GET = async (request: NextRequest) => {
  const isAuthenticated = await authenticate(request);

  if (!isAuthenticated) {
    return;
  }
  const UserId = request.headers.get("UserId");
  const deleteUser = await User.findByIdAndDelete({ _id: UserId });
  if (deleteUser) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "User not found",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "User deleted Successfully",
  });
};
