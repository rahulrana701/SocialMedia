import { User, Post } from "db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { PostId } = params;
  const UserId = request.headers.get("UserId") as string;

  const PostbyId = await Post.findById({ _id: PostId });
  if (!PostbyId) {
    NextResponse.json({
      status: 403,
      success: false,
      message: "No Post To Be Found",
    });
    return;
  }
  let usertobookmark = await User.findById({ _id: UserId });
  if (!usertobookmark) {
    return NextResponse.json({
      status: 403,
      success: "false",
      message: "User cannot bookmark this post",
    });
  }

  const book = usertobookmark.Bookmarks;
  const postId = new mongoose.Types.ObjectId(PostId);
  if (book.includes(postId)) {
    usertobookmark = await User.findByIdAndUpdate(
      { _id: UserId },
      { $pull: { Bookmarks: PostId } },
      { new: true }
    );
    NextResponse.json({
      status: 200,
      success: true,
      message: "Post removed from bookmarks successfully",
      usertobookmark,
    });
    return;
  }

  usertobookmark = await User.findByIdAndUpdate(
    { _id: UserId },
    { $push: { Bookmarks: PostId } },
    { new: true }
  );
  NextResponse.json({
    status: 200,
    success: true,
    message: "Post Bookmarked Successfully",
    usertobookmark,
  });
};
