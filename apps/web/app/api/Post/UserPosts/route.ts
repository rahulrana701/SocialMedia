import { Post } from "db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const UserId = request.headers.get("UserId");
  const Userposts = await Post.find({ owner: UserId });

  if (!Userposts) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: " There are no posts associated with the user",
    });
    return;
  }

  NextResponse.json({
    status: 200,
    success: "true",
    message: "Post Found Successfully",
    Userposts,
  });
};
