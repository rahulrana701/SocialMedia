import { Post } from "db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const UserId = request.headers.get("UserId");
  const { PostId } = params;
  const data = await request.json();
  const { Tweet, TweetImage } = data;

  const EditPost = await Post.findByIdAndUpdate(
    { _id: PostId, owner: UserId },
    { Tweet, TweetImage },
    { new: true }
  );
  if (!EditPost) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "Post Couldn't Be Edited",
    });
    return;
  }

  NextResponse.json({
    status: 200,
    success: "true",
    message: "Post Edited Successfully",
    EditPost,
  });
};
