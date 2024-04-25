import { NextRequest, NextResponse } from "next/server";
import { Post } from "db";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { PostId } = params;
  const UserId = request.headers.get("UserId");
  const commentText2 = await request.json();
  const commentText = commentText2.Comments[0].comment;
  const commentonPost = await Post.findByIdAndUpdate(
    { _id: PostId },
    { $push: { Comments: { User: UserId, comment: commentText } } },
    { new: true }
  );
  if (!commentonPost) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: 'Post Couldn"t be found',
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "commented successfully",
    commentonPost,
  });
};
