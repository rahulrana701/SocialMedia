import { NextRequest, NextResponse } from "next/server";
import { User } from "db";
import { authenticate } from "middlewares";
import mongoose from "mongoose";

export const PATCH = async (request: NextRequest, { params }:any ) => {
  const isAuthenticated = await authenticate(request);

  if (!isAuthenticated) {
    return;
  }

  const { FollowingUserId } = params;
  const UserId = request.headers.get("UserId");

  const otherUser = await User.findById({ _id: FollowingUserId });
  const currentUser = await User.findById({ _id: UserId });
  if (otherUser?._id.toString() == currentUser?._id.toString()) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "you cannot follow yourself",
    });
    return;
  }

  const followingUserIdObj = new mongoose.Types.ObjectId(
    FollowingUserId as string
  );

  if (currentUser?.Following.includes(followingUserIdObj)) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "User already followed",
    });
    return;
  }

  const FollowingList = await User.findByIdAndUpdate(
    { _id: UserId },
    { $push: { Following: FollowingUserId } },
    { new: true }
  );

  const FollowerList = await User.findByIdAndUpdate(
    { _id: FollowingUserId },
    { $push: { Followers: UserId } },
    { new: true }
  );

  if (!FollowerList) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: 'Task couldn"t be completed',
    });
    return;
  }

  if (!FollowingList) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: 'Task couldn"t be completed',
    });
    return;
  }

  NextResponse.json({
    success: "true",
    message: "followed successfully",
    FollowingList,
  });
};
