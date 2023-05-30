import { body, validationResult } from "express-validator";
import User from "../models/user-model";
import bcrypt from "bcrypt";

const validateSignup = [
    body("name").notEmpty().withMessage("Username is Required"),
    body("email").isEmail().withMessage("Invalid Email."),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password Must Be At Least 6 Characters.")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^])[A-Za-z\d@$!%*?&^]+$/
        )
        .withMessage(
            "Password Must Contain At Least One Lowercase Letter, One Uppercase Letter, One Number, and One Special Character"
        ),
    body("confirmPassword")
        .custom((value, { req }) => value === req.body.password)
        .withMessage("Passwords Does Not Match"),
];


const signupController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("pages/Signup", {
            title: "Signup page - Validation Failed",
            errors: errors.array(),
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const existingUser = await User.findOne({ name: req.body.username });

        if (existingUser) {
            withMessage("Email Already Exists");
        }
        else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });

            await newUser.save();

            withMessage("Signed Up Successfully");
        }
    } catch (error) {
        withMessage("An Error Occurred");
    };
}
export { validateSignup, signupController }