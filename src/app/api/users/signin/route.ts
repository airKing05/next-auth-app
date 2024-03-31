import connect from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


connect();

export async function POST(request: NextRequest) {
   try {
       const requestBody = await request.json();

       const { email, password } = requestBody;

       const user = await User.findOne({ email });
       console.log("user", user)

       if (!user) {
           return NextResponse.json({ error: "User does not exit with this email " }, { status: 400 })
       }

       const isPasswordValid = await bcrypt.compare(password, user.password);

       if(!isPasswordValid){
           return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
       }

       const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
       }
       // generally id is sended in token

       const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
       const response = NextResponse.json({ message: "Sign in successfully", success: true }, { status: 200 });

       response.cookies.set("token", token, {httpOnly: true});

       return response;

   } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500})
   }
}