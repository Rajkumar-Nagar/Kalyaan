import connectToMongoose from "@/lib/db";
import { User } from "@/model/user.model";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers';

const generateAccesTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("what i am reach")
    if (!user) {
      throw new Error("User not found");
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.username,
      },
      "rajdhakad", // process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      "raj264", // process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "9d",
      }
    );

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Access token generation failed: " + error.message);
  }
};

export async function POST(request) {
  try {
    await connectToMongoose();

    const { userName, password } = await request.json();

    if (!userName || !password) {
      return NextResponse.json({ message: "Please enter required fields" }, { status: 400 });
    }
    const user = await User.findOne({ userName });
    console.log(user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return NextResponse.json({ message: "Password is incorrect" }, { status: 401 });
    }

    const { accessToken, refreshToken } = await generateAccesTokenAndRefreshToken(user._id);

    cookies().set('accessToken', accessToken, { httpOnly: true });
    cookies().set('refreshToken', refreshToken, { httpOnly: true });

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return NextResponse.json({ loggedInUser, message: "User logged in successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "User login failed", error: error.message }, { status: 500 });
  }
}
