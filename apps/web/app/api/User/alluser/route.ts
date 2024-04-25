import { User } from "db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await User.find();
  if (!users) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "no users existed",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "false",
    message: "Users Found Successfully",
    users,
  });
}
