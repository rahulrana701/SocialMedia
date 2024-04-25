import { NextRequest, NextResponse } from "next/server";
import { User } from "db";
import { authenticate } from "middlewares";

export const PATCH = async (request: NextRequest, { params }: any) => {
  const isAuthenticated = await authenticate(request);

  if (!isAuthenticated) {
    return;
  }

  const { unfollowUserId } = params;
  const UserId = request.headers.get("UserId");

  const dataAfterUnfollowing = await User.findByIdAndUpdate(
    { _id: UserId },
    { $pull: { Following: unfollowUserId } },
    { new: true }
  );

  const dataAfterUnfollowing2 = await User.findByIdAndUpdate(
    { _id: unfollowUserId },
    { $pull: { Followers: UserId } },
    { new: true }
  );

  if (!dataAfterUnfollowing) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "task could not be completed",
    });
    return;
  }

  if (!dataAfterUnfollowing2) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "task could not be completed",
    });
    return;
  }
  NextResponse.json({
    status: 200,
    success: "true",
    message: "user unfollowed successfully",
    dataAfterUnfollowing,
    dataAfterUnfollowing2,
  });
};
