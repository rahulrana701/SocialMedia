import { Post } from "db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const { PostId } = params;
  const UserId = request.headers.get("UserId") as string;

  try {
    let likedpost = await Post.findById({ _id: PostId });

    if (!likedpost) {
      return NextResponse.json({
        status: 404,
        success: false,
        message: "Post not found",
      });
    }

    const likes = likedpost.Likes;
    const userId = new mongoose.Types.ObjectId(UserId);
    if (likes.includes(userId)) {
      likedpost = await Post.findByIdAndUpdate(
        { _id: PostId },
        { $pull: { Likes: UserId } },
        { new: true }
      );
      return NextResponse.json({
        status: 200,
        success: true,
        message: "Post unliked successfully",
        likedpost,
      });
    }

    likedpost = await Post.findByIdAndUpdate(
      { _id: PostId },
      { $push: { Likes: UserId } },
      { new: true }
    );

    if (!likedpost) {
      return NextResponse.json({
        status: 403,
        success: false,
        message: "Post not found",
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Post liked successfully",
      likedpost,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal server error occurred",
    });
  }
};
