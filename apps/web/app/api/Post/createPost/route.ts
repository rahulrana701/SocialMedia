import { NextRequest, NextResponse } from "next/server";
import { Post } from "db";

export const POST = async (request: NextRequest) => {
  const UserId = request.headers.get("UserId");
  const data = await request.json();
  const { Tweet, TweetImage } = data;

  const createdPost = await Post.create({
    owner: UserId,
    Tweet,
    $push: { TweetImage: TweetImage },
  });
  if (!createdPost) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "post could not be created",
    });
    return;
  }
  NextResponse.json({
    status: 403,
    success: "true",
    message: "post created successfully ",
    createdPost,
  });
};
