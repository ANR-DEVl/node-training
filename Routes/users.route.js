
const express = require('express');
const {body} = require('express-validator');

const userController = require('../Controllers/user.controller')
const router = express.Router()


router.post('/register',
    body('userName').notEmpty().isString().isLength({min:8,max:15}).withMessage('invalid userName'),
    body('password').notEmpty().isString().isLength({min:10,max:15}).withMessage('invalid password'),
    body('email').notEmpty().isEmail().withMessage('invalid email')
    ,userController.register)

router.post('/login',
    body('password').notEmpty().isString().isLength({min:10,max:15}).withMessage('invalid password'),
    body('email').notEmpty().isEmail().withMessage('invalid email'),
    userController.login)









module.exports = router


