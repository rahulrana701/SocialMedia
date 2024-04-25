import { Post } from "db";
import { NextResponse } from "next/server";

export const GET = async () => {
  const posts = await Post.find();
  if (!posts) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "no posts to be found",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "Post Found Successfully",
    posts,
  });
};
