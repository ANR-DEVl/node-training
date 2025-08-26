
const {validationResult}=require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')

const register =async(req,res)=>{


    try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:'fail',data:{message:errors.array()}})
    }

    const {userName,password,email} = req.body

    const existing =await User.findOne({email})
    if(existing){
        return res.status(400).json({status:'fail',data:{message:'email already exist'}})
    }

    const hashedPassword =await bcrypt.hash(password,10);

    const newUser =new User({
        userName,
        email,
        password:hashedPassword
    })

    await newUser.save()
    res.status(201).json({status:'successs',data:{user:{userName:newUser.userName,email:newUser.email}}})
    }catch(err){
        return res.status(400).json({status:'error',message:err.message})
    }

}








const login = async(req,res)=>{

    try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:'fail',data:{message:errors.array()}})
    }

    const {email,password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({status:'fail',data:{message:'user not found'}})
    }

    const isMatch =await bcrypt.compare(password,user.password)

    if(!isMatch){
        return res.status(400).json({status:'fail',data:{message:'incorrect password'}})
    }

    const token = jwt.sign({userName:user.userName,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'3h'})

    res.status(200).json({status:'success',data:{token,message:'logged successfully',user:{userName:user.userName,email:user.email,role:user.role}}})
    
    }catch(err){
        return res.status(400).json({status:'error',message:err.message})
    }

}




module.exports ={register,login}