
const express = require('express');
const {body,validationResult} = require('express-validator');


const productsController = require('../Controllers/product.controller');
const verifyToken = require('../middlewares/verifyToken');



const router = express.Router();


router.route('/')
    .get(productsController.getAllProducts)
    .post(
    body('title').notEmpty().isString().isLength({min:6,max:25}).withMessage('invalid title'),
        body('price').isNumeric().withMessage('invalid price'),
        body('discription').isString().isLength({min:30}).withMessage('invalid discription')
        ,productsController.addProduct)


router.route('/:id')
    .get(productsController.getProduct)
    .patch(productsController.editProduct)
    .delete(verifyToken,productsController.deleteProduct)







module.exports = router