import { Post } from "db";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, { params }: any) => {
  const UserId = request.headers.get("UserId");
  const { PostId } = params;

  const DeletedPost = await Post.findByIdAndDelete({
    _id: PostId,
    owner: UserId,
  });

  if (!DeletedPost) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "Post Couldn't be deleted",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "Post Deleted Successfully",
  });
};
