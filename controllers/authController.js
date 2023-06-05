import asyncHandler from "express-async-handler";
//imprt l package el hashing
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
//n7tag ll user w el validation functions
import {
User,
validateRegisterUser,
validateLoginUser
}
    from "../models/user-model.js";


// Create a client
function generateUsername(fullName) {
    let firstName = fullName.split(' ')[0];
    let randomNumber = Math.floor(Math.random() * 1000);
    return firstName+randomNumber;
  }

/**
 * @desc  Register New User
 * @route  /api/auth/register
 * @method  POST
 * @access  public
 */
const register = asyncHandler(async (req, res) => {
    //const {error} 3shan hayrg3ly error

    const { error } = validateRegisterUser(req.body);

    if (error) {
        return res.render('pages/Signup', { user: (req.session.user === undefined ? "" : req.session.user), message: error.details[0].message });
    }

    // lw el mail mawgood fl data base a2olo eno mawgood
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.render('pages/Signup', { user: (req.session.user === undefined ? "" : req.session.user), message: "This User already registered" });

    }

    const new_username = generateUsername(req.body.username); 
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.USER_EMAIL,
            pass: user.email
        }
    });
    const mail_option = {
        from: process.env.USER_EMAIL,
        to: req.body.email,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        </head>
        <body>
          
        </body>
        </html> `

    };
    


//hashing ll password 
const salt = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password, salt);
req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);



user = new User({
    username: new_username,
    email: req.body.email,
    password: req.body.password
});



//deh kant btb3t el pass ll user //res.status(201).json(result);
//lakn e7na la2 hanb3tlo el ...other w el token w msh hnb3t el pass b3d el hashing
//res.status(201).json({...other,token});
if (req.body.password === req.body.confirmPassword) {


    const result = await user.save();
    req.session.user = result;
    //abl ma a3ml function fl user model 3shan makarrsh el goz2 bta3 el jwt dh
    //const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET_KEY);
    //ba3d el function eli fl user model
    const token = user.generateToken();
    const { password, ...other } = result._doc;
 
    
    transporter.sendMail(mail_option, (error, info) => {
        if (error) {
            console.log(error);
        }
        else {
            res.redirect("/");
        }
    });
}

  })

/**
* @desc  Login User
* @route  /api/auth/login
* @method  POST
* @access  public
*/

const login = asyncHandler(async (req, res) => {
    //const {error} 3shan hayrg3ly error
    const { error } = validateLoginUser(req.body);

    if (error) {
        return res.render('pages/login', { user: (req.session.user === undefined ? "" : req.session.user), message: error.details[0].message });

    }

    // lw el user msh mawgood, byb3t query ll database yshof el user mawgood wla la
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.render('pages/login', { user: (req.session.user === undefined ? "" : req.session.user), message: "invalid username or password" });
    }
    //hnshoof el password s7 wla la              mn el client       mn el database
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    //lw el password 8alat
    if (!isPasswordMatch) {
        return res.render('pages/login', { user: (req.session.user === undefined ? "" : req.session.user), message: "invalid username or password" });
    }
    //abl ma a3ml function fl user model 3shan makarrsh el goz2 bta3 el jwt dh
    // el methos sign gowa el jwt bt3ml new token awl param el payload tany param secret key talet param e5tyary el expire date 4d 4 days lw mktbtsh hayb2a sale7 ll abd
    //const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET_KEY);
    //ba3d el function eli esmaha generate token fl user model
    req.session.user = user;
    
    const token = user.generateToken();
    const { password, ...other } = user._doc;

    //deh kant btb3t el pass ll user //res.status(201).json(result);
    //lakn e7na la2 hanb3tlo el ...other w el token w msh hnb3t el pass b3d el hashing
    //lw el mail w el password s7 kda 5las
    //res.status(200).json({...other,token});
   
    res.redirect("/");
})



export {
    register,
    login
}