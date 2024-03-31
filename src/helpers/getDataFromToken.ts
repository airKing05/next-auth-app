import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request : NextRequest) => {
   try {
    const token: any = request.cookies.get("token");
      console.log("token", token)
       const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!) || "";
       console.log("decodedToken", decodedToken)
       const { id }: any = decodedToken;
       return id;
   } catch (error : any) {
     throw new Error(error.message);
     
   }
}