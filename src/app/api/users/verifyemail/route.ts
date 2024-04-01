import connect from "@/db/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
   try {
       const requestBody = await request.json();
       const { token } = requestBody;

       if (!token) {
           return NextResponse.json({ error: "token not found" }, { status: 404 })
       }
       console.log('token', token);

       const user = await User.findOne({ verifyToken: token, verifyTokenExpiry : {$gt: Date.now()}});

       if(!user){
           return NextResponse.json({ error: "Invalid user token"}, { status: 400 })
       }

       user.isVerified = true;
       user.verifyToken = undefined;
       user.verifyTokenExpiry = undefined;

       await user.save()

       return NextResponse.json({ message: "User verified successfully", success: true }, { status: 200 })

   } catch (error : any) {
    return NextResponse.json({error: error.message}, {status : 500})
   }
    
}