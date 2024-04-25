import { NextRequest, NextResponse } from "next/server";
import { User, Post } from "db";
import { authenticate } from "middlewares";

export const GET = async (request: NextRequest) => {
  const isAuthenticated = await authenticate(request);

  if (!isAuthenticated) {
    return;
  }

  const UserId = request.headers.get("UserId");
  const user = await User.findOne({ _id: UserId });
  if (!user) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "User not found",
    });
    return;
  }
  const posts = user.Bookmarks;
  const bookmarkedPosts = posts.map((p) => p._id);
  const allposts = await Post.find({ _id: { $in: bookmarkedPosts } });
  if (!allposts) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "No Bookmarks To Be Found",
    });
    return;
  }
  NextResponse.json({ status: 200, success: true, allposts });
};
