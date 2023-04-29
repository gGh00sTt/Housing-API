import {Request,Response} from "express"
import jwt,{JwtPayload, Secret} from "jsonwebtoken"
import {UnauthenticatedError} from "../errors"
import { envVars } from "../constants"

interface MyJwtPyload extends JwtPayload {
    userId: string | number;
    userName: string;
}


const authentication=async(req:any,res:Response,next:any)=>{
    const authHeader=req.headers.authorization

    console.log("this is auth",authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer"))
    {
        next(new UnauthenticatedError("Authentication invalid"))
    }
    const token=authHeader.split(" ")[1]
    console.log("this is token",token)
    console.log(req.body);
    
    try {
        const JWT_SECRET:Secret=envVars.JWT_TOKEN
        jwt.verify(token,JWT_SECRET) as MyJwtPyload

        next()
    } catch (error) {
        next(new UnauthenticatedError("Authentication invalid"))
    }
}

export default authentication