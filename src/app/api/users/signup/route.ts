import connect from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import sendEmail from "@/helpers/mailer";

connect();

export async function POST(request : NextRequest){
  try {
    const requestedBody = await request.json();
      const { username, email, password } = requestedBody;
     
      // check if user already exit
      const user = await User.findOne({email});

      if(user){
        return NextResponse.json({ error: 'user already exist' }, { status: 400 })
      }

      //hashing the password save before to the db
     const salt =  await bcrypt.genSalt(10); 
     const hashedPassword = await bcrypt.hash(password, salt);

     const newUser = new User({
        username,
        email,
        password: hashedPassword
     })

     const savedUser = await newUser.save();

    console.log("savedUser", savedUser)
     // send vaticination email
     await sendEmail({email, emailType: 'verify', userId: savedUser._id})

    return NextResponse.json({ message: 'User registered successfully', success: true, savedUser }, { status : 201})

  } catch (error : any) {
      return NextResponse.json({error: error.message}, {status: 500})
  }
}


 