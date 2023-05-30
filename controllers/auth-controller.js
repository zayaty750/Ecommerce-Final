import { body, validationResult } from "express-validator";
import User from "../models/user-model";
import bycrypt from "bcrypt";

const validateSignup=[
    body("name").notEmpty().withMessage("Username is Required"),
    body("email").isEmail().withMessage("Invalid Email."),
    body("password")
    .isLength({min:6})
    .withMessage("Password Must Be At Least 6 Characters.")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
    )
    .withMessage(
        "Password Must Contain At Least One Lowercase Letter, One Uppercase Letter, One Number, and One Special Character"
    ),
    body("confirmPassword")
    .custom((value, {req})=> value===req.body.password)
    .withMessage("Passwords Does Not Match"),
];
