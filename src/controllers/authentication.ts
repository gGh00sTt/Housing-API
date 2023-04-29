import User from '../models/users'
import { Request,Response} from 'express'
import {StatusCodes} from 'http-status-codes'
import bcrypt from 'bcryptjs'
import {BadRequestError,UnauthenticatedError} from '../errors/index'


export const register=async(req:Request,res:Response,next:any)=>{
    const {username,email,password}=req.body
    
    if(!username || !email || !password ){
        next(new BadRequestError("Please Provide username, email and password"))
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({username,email,password:hashedPassword})
    res.status(StatusCodes.CREATED).json({msg:'Registration Successful'})    
}

export const login=async(req:Request,res:Response,next:any)=>{
    const {email,password}=req.body

    if(!email || !password){
        return next(new BadRequestError("Please Provide email and password"))
    }

    const user= await User.findOne({where:{email}})

    if(!user){
        console.log('no user',email)
        return next(new UnauthenticatedError("User email doesn't exist"))
    }

    console.log(user)

    const isPasswordCorrect=await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        return next(new UnauthenticatedError("Invalid Password"))
    }

    const token=user.createJWT()

    res.status(StatusCodes.OK).json({token})
}


