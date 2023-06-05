import asyncHandler from"express-async-handler";
import{User,validateChangePassword}from"../models/user-modeljs"
import jwt from"jsonwebtoken";
import bcrypt from"bcryptjs";
import nodemailer from"nodemailer";


// Get Forgot Password View
const getForgotPasswordView = asyncHandler((req,res)=>{
    //hna haya5d el page eli esmaha forgot-password mn el views
    res.render('forgot-password');
})


export{
    getForgotPasswordView
};