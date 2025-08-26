

const Product = require('../models/products')
const {validationResult} = require('express-validator')
require('dns').setDefaultResultOrder('ipv4first');


const getAllProducts= async (req,res)=>{
    try{
    const products = await Product.find()

    res.status(200).json({status:'success',data:{products}})

    }catch(err){
        res.status(404).json({status:'error',message:err.message})
    }
}







const addProduct = async(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({status:'error',message:errors.array()})
    }

    try{

        const newProduct = new Product(req.body)
        await newProduct.save()

        res.status(200).json({status:'success',data:{product:newProduct}})

    }catch(err){
        res.status(404).json({status:'error',message:err.message})
    }
}









const getProduct =async(req,res)=>{

    

    try{
        const id = req.params.id

        const selectedProduct =await Product.findById(id)
        if(!selectedProduct){
            return res.status(404).json({status:'fail',data:{message:'product not found'}})
        }
        
        res.status(200).json({status:'success',data:{product:selectedProduct}} )

    }catch(err){
        res.status(404).json({status:'error',message:err.message})
    }
}








const deleteProduct =async(req,res)=>{

    

    try{
        const id = req.params.id

        const deletedProduct =await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            return res.status(404).json({status:'fail',data:{message:'product not found'}})
        }
        
        res.status(200).json({status:'success',data:{message:'product deleted successfully'}} )

    }catch(err){
        res.status(404).json({status:'error',message:err.message})
    }
}




const editProduct =async(req,res)=>{

    

    try{
        const id = req.params.id

        const updatedProduct =await Product.findByIdAndUpdate(id,{$set :{...req.body}},{new:true})
        if(!updatedProduct){
            return res.status(404).json({status:'fail',data:{message:'product not found'}})
        }
        
        res.status(200).json({status:'success',data:{product:updatedProduct}} )

    }catch(err){
        res.status(404).json({status:'error',message:err.message})
    }
}









module.exports = {getAllProducts,getProduct,addProduct,deleteProduct,editProduct}