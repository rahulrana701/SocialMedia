import { User } from "db";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const jwtsecret = process.env.DB_JWTSECRET || "default_secret";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { Username, Email, Password } = data;
  if (!Username || !Email || !Password) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "Please enter all the fields",
    });
    return;
  }
  const CheckUser = await User.findOne({ Username, Email });

  if (!CheckUser) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "User Does not Exist",
    });
    return;
  }

  const pass = await bcrypt.compare(Password, CheckUser.Password);
  if (!pass) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "please enter the correct password",
    });
    return;
  }

  const token = Jwt.sign({ UserId: CheckUser._id }, jwtsecret);
  NextResponse.json({
    status: 200,
    success: "true",
    message: "Logged In Successfully",
    token,
  });
}
