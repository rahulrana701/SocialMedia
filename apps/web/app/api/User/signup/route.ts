import { User } from "db";
import Jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// eslint-disable-next-line turbo/no-undeclared-env-vars
const jwtsecret = process.env.DB_JWTSECRET || "default_secret";

export async function POST(request: NextRequest) {
  const data = await request.json();
  const { Username, Email, Password, Phonenumber, Country, ProfilePicture } =
    data;

  if (
    !Username ||
    !Email ||
    !Password ||
    !Phonenumber ||
    !Country ||
    !ProfilePicture
  ) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "Please enter all the fields",
    });
    return;
  }

  const ExistingUser = await User.findOne({ Username, Email });
  if (ExistingUser) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "User already Exisits",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const newpassword = await bcrypt.hash(Password, salt);

  const tempUser = {
    Username,
    Email,
    Password: newpassword,
    Phonenumber,
    Country,
    ProfilePicture,
  };
  const UserCreated = await User.create({ ...tempUser });
  console.log(UserCreated);
  if (!UserCreated) {
    NextResponse.json({
      status: 403,
      success: "false",
      message: "some error occured",
    });
    return;
  }
  const token = Jwt.sign(
    { UserId: UserCreated._id, name: UserCreated.Username },
    jwtsecret
  );
  NextResponse.json({
    status: 200,
    success: "true",
    message: "Signed Up Successfully",
    token,
  });
}
