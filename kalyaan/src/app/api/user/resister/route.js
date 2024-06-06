
import connectToMongoose from "@/lib/db";
import {User} from "../../../../model/user.model"

const bcrypt = require('bcrypt');

export async function POST(request) {
    try {
        await connectToMongoose()
        const {userName,email,password} = await request.json();
        

        if(!userName||!email||!password){
            return new Response(JSON.stringify({ message: "Please send required field", error: error.message }), {
                status: 400,
              });
        }
        const existUser = await User.findOne(
            { $or: [{ email }, { userName }] }
        )
        if(existUser){
            return new Response(JSON.stringify({ message: "user is already exist", error: error.message }), {
                status: 409,
              });
        }

        const hashPassword=await bcrypt.hash(password,10);

        const user=await User.create({
            userName,
            email,
            password:hashPassword
        })
        const createuser=await User.findById(user._id).select("-password")

        if(!createuser){
            return new Response(JSON.stringify({ message: "user is not created", error: error.message }))
        }

      return new Response(JSON.stringify({createuser, message: "User resister succesfully" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });

    } catch (error) {
      return new Response(JSON.stringify({ message: "User resister failed", error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });

    }
  }
  