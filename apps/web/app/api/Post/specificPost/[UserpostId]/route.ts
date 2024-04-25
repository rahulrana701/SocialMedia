import { NextRequest, NextResponse } from "next/server";
import { Post } from "db";

export const GET = async (request: NextRequest, { params }: any) => {
  const { UserpostId } = params;
  const specificUserPost = await Post.find({ owner: UserpostId });
  if (!specificUserPost) {
    NextResponse.json({
      status: 403,
      success: false,
      message: "No Post To Be Found",
    });
    return;
  }
  NextResponse.json({ status: 200, success: true, specificUserPost });
};
