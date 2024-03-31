import connect from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request:NextRequest) {
    try {
        console.log("first+++++++++")
        const response = NextResponse.json({ message: "Sign out successfully", success: true }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            expires : new Date(0)
        })
        console.log("second+++++++++")
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}