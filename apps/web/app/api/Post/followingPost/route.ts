import { Post, User } from "db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const UserId = request.headers.get("UserId");
  const currentuser = await User.findOne({ _id: UserId });
  if (!currentuser) {
    NextResponse.json({
      status: 403,
      success: false,
      message: "No User Found",
    });
    return;
  }
  const followingData = currentuser.Following;
  const followingId = followingData.map((user) => user._id);
  const followingPosts = await Post.find({ owner: { $in: followingId } });
  if (!followingPosts) {
    NextResponse.json({
      status: 403,
      success: false,
      message: "Following have no Posts",
    });
    return;
  }

  NextResponse.json({ status: 200, success: "true", followingPosts });
};
