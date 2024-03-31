import connect from "@/db/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
 // extracted data from token
        const userId =  getDataFromToken(request);
        if (!userId){
            return NextResponse.json({ message: "User verification failed", success: false, data: null }, { status: 200 })
        }
        const user = await User.findOne({_id : userId}).select("-password");
        return NextResponse.json({ message: "User verified successfully", success: true, data: user }, { status: 401 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}