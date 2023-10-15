import userData from '../models/user.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
export const signIn = async(req,res)=>{
const {userName,password} = req.body
try {
    const existinguser = await userData.findOne({userName})
    if (!existinguser) {
        res.status(404).json('No user Exists')
    }
    const correctpassword = await bcrypt.compare(password,existinguser?.password)
    if (!correctpassword) {
        res.status(404).json('error password')
    }
    else{
        const token = jwt.sign({id:existinguser?._id},'test') 
        res.cookie('access_token',token,{
            httpOnly:true,
        })  
        .status(200)
        .json(existinguser)
        // res.json({existinguser,token})
    }
} catch (error) {
    res.status(404).json(error)
}

}

export const signUp = async(req,res)=>{
    const {firstName,lastName,userName,email,password,confirmpassword, profile} = req.body
    try {
        const existinguser = await userData.findOne({userName})
        if (existinguser) {
            res.status(400);
            throw new Error("User already exists");
        }  
        if (password !==confirmpassword) {
            res.status(400).json({message:'Password is not matched'})
        }
        const hashedpassword = await bcrypt.hash(password,10)
        const result = new userData({name: `${firstName} ${lastName}`, userName,email,password:hashedpassword,profile})
        await result.save()
        res.json({result})
    } catch (error) {
       
    }
    
}