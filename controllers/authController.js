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
            pass:  process.env.USER_PASS
        }
    });
    const mail_option = {
        from:"loginservice720@gmail.com",
        to: req.body.email,
        html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns:v="urn:schemas-microsoft-com:vml"><head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;">
        <!--[if !mso]--><!-- -->
        <link href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Quicksand:300,400,700" rel="stylesheet">
        <!-- <![endif]-->
    
        <title>Material Design for Bootstrap</title>
    
        <style type="text/css">
            body {
                width: 100%;
                background-color: #ffffff;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                mso-margin-top-alt: 0px;
                mso-margin-bottom-alt: 0px;
                mso-padding-alt: 0px 0px 0px 0px;
            }
            
            p,
            h1,
            h2,
            h3,
            h4 {
                margin-top: 0;
                margin-bottom: 0;
                padding-top: 0;
                padding-bottom: 0;
            }
            
            span.preheader {
                display: none;
                font-size: 1px;
            }
            
            html {
                width: 100%;
            }
            
            table {
                font-size: 14px;
                border: 0;
            }
            /* ----------- responsivity ----------- */
            
            @media only screen and (max-width: 640px) {
                /*------ top header ------ */
                .main-header {
                    font-size: 20px !important;
                }
                .main-section-header {
                    font-size: 28px !important;
                }
                .show {
                    display: block !important;
                }
                .hide {
                    display: none !important;
                }
                .align-center {
                    text-align: center !important;
                }
                .no-bg {
                    background: none !important;
                }
                /*----- main image -------*/
                .main-image img {
                    width: 440px !important;
                    height: auto !important;
                }
                /* ====== divider ====== */
                .divider img {
                    width: 440px !important;
                }
                /*-------- container --------*/
                .container590 {
                    width: 440px !important;
                }
                .container580 {
                    width: 400px !important;
                }
                .main-button {
                    width: 220px !important;
                }
                /*-------- secions ----------*/
                .section-img img {
                    width: 320px !important;
                    height: auto !important;
                }
                .team-img img {
                    width: 100% !important;
                    height: auto !important;
                }
            }
            
            @media only screen and (max-width: 479px) {
                /*------ top header ------ */
                .main-header {
                    font-size: 18px !important;
                }
                .main-section-header {
                    font-size: 26px !important;
                }
                /* ====== divider ====== */
                .divider img {
                    width: 280px !important;
                }
                /*-------- container --------*/
                .container590 {
                    width: 280px !important;
                }
                .container590 {
                    width: 280px !important;
                }
                .container580 {
                    width: 260px !important;
                }
                /*-------- secions ----------*/
                .section-img img {
                    width: 280px !important;
                    height: auto !important;
                }
            }
        </style>
        <!-- [if gte mso 9]><style type=”text/css”>
            body {
            font-family: arial, sans-serif!important;
            }
            </style>
        <![endif]-->
    </head>
    
    
    <body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
        <!-- pre-header -->
        <table style="display:none!important;">
            <tbody><tr>
                <td>
                    <div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
                        Pre-header for the newsletter template
                    </div>
                </td>
            </tr>
        </tbody></table>
        <!-- pre-header end -->
        <!-- header -->
        <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
    
            <tbody><tr>
                <td align="center">
                    <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
    
                        <tbody><tr>
                            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                        </tr>
    
                        <tr>
                            <td align="center">
    
                                <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
    
                                    <tbody><tr>
                                        <td align="center" height="70" style="height:70px;">
                                            <a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="100" border="0" style="display: block; width: 100px;" src="" alt="" class=""></a>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
    
                        <tr>
                            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                        </tr>
    
                    </tbody></table>
                </td>
            </tr>
        </tbody></table>
        <!-- end header -->
    
        <!-- big image section -->
        <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
    
            <tbody><tr>
                <td align="center">
                    <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
                        <tbody><tr>
    
                            <td align="center" class="section-img">
                                <a href="" style=" border-style: none !important; display: block; border: 0 !important;"><img src="" style="display: block; width: 590px;" width="590" border="0" alt=""></a>
    
    
    
    
                            </td>
                        </tr>
                        <tr>
                            <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                        </tr>
                        <tr>
                            <td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
    
    
                                <div style="line-height: 35px">
    
                                    NEW IN <span style="color: #5caad2;">Blankoo</span>
    
                                </div>
                            </td>
                        </tr>
    
                        <tr>
                            <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                        </tr>
    
                        <tr>
                            <td align="center">
                                <table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
                                    <tbody><tr>
                                        <td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
    
                        <tr>
                            <td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
                        </tr>
    
                        <tr>
                            <td align="center">
                                <table border="0" width="400" align="center" cellpadding="0" cellspacing="0" class="container590">
                                    <tbody><tr>
                                        <td align="center" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">
    
    
                                            <div style="line-height: 24px">
                                               <h6>Hi ${req.body.username}</h6>
                                               <h6>your username is: ${new_username}</h6>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody></table>
                            </td>
                        </tr>
    
                        <tr>
                            <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                        </tr>
    
                        <tr>
                            <td align="center">
                                <table border="0" align="center" width="160" cellpadding="0" cellspacing="0" bgcolor="5caad2" style="">
    
                                    <tbody><tr>
                                        <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                                    </tr>
    
                                    <tr>
                                        <td align="center" style="color: #ffffff; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 26px;">
    
    
                                            <div style="line-height: 26px;">
                                                <a href="" style="color: #ffffff; text-decoration: none;">SHOP NOW</a>
                                            </div>
                                        </td>
                                    </tr>
    
                                    <tr>
                                        <td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
                                    </tr>
    
                                </tbody></table>
                            </td>
                        </tr>
    
    
                    </tbody></table>
    
                </td>
            </tr>
    
        </tbody></table>
        <!-- end section -->
    
        <!-- contact section -->
        <table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
    
            <tbody><tr class="hide">
                <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
            </tr>
            <tr>
                <td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
            </tr>
    
            <tr>
                <td height="60" style="border-top: 1px solid #e0e0e0;font-size: 60px; line-height: 60px;">&nbsp;</td>
            </tr>
    
            <tr>
                <td align="center">
                    <table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">
    
                        <tbody><tr>
                            <td>
                                <table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
    
                                    <tbody>
    
                                    <tr>
                                        <td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
                                    </tr>
    
                                    <tr>
                                        <td align="left" style="color: #888888; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 23px;" class="text_color">
                                            <div style="color: #333333; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">
    
                                                Email us: <br> <a href="mailto:" style="color: #888888; font-size: 14px; font-family: 'Hind Siliguri', Calibri, Sans-serif; font-weight: 400;">Blankoo@gmail.com</a>
    
                                            </div>
                                        </td>
                                    </tr>
    
                                </tbody></table>
    
                                <table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
                                    <tbody><tr>
                                        <td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>
                                    </tr>
                                </tbody></table>
    
      
    
            <tr>
                <td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
            </tr>
    
        </tbody></table>
        <!-- end section -->
    
    
    
    
    
    </body></html>`

    };
    


//hashing ll password 
const salt = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password, salt);
req.body.confirmPassword = await bcrypt.hash(req.body.confirmPassword, salt);


//deh kant btb3t el pass ll user //res.status(201).json(result);
//lakn e7na la2 hanb3tlo el ...other w el token w msh hnb3t el pass b3d el hashing
//res.status(201).json({...other,token});
if (req.body.password === req.body.confirmPassword) {

    user = new User({
        username: new_username,
        email: req.body.email,
        password: req.body.password
    });

    
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