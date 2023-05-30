import asyncHandler from "express-async-handler";
//imprt l package el hashing
import bcrypt from"bcryptjs";

//n7tag ll user w el validation functions
import 
    {User,
    validateRegisterUser,
    validateLoginUser}
   from "../models/user-model.js";


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
      return res.status(400).json({ message: error.details[0].message });
    }

    // lw el mail mawgood fl data base a2olo eno mawgood
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "This User already registered" });
    }

    //hashing ll password 
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);


    user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
      //isAdmin: req.body.isAdmin,
    });

    const result = await user.save();
    //abl ma a3ml function fl user model 3shan makarrsh el goz2 bta3 el jwt dh
    //const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET_KEY);
    //ba3d el function eli fl user model
    const token = user.generateToken();
    const {password, ...other} = result._doc;

    //deh kant btb3t el pass ll user //res.status(201).json(result);
    //lakn e7na la2 hanb3tlo el ...other w el token w msh hnb3t el pass b3d el hashing
    //res.status(201).json({...other,token});
    req.session.user = user;
    res.redirect("/");
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
      return res.status(400).json({ message: error.details[0].message });
    }

    // lw el user msh mawgood, byb3t query ll database yshof el user mawgood wla la
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    //hnshoof el password s7 wla la              mn el client       mn el database
    const isPasswordMatch = await bcrypt.compare(req.body.password,user.password);
    //lw el password 8alat
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    //abl ma a3ml function fl user model 3shan makarrsh el goz2 bta3 el jwt dh
    // el methos sign gowa el jwt bt3ml new token awl param el payload tany param secret key talet param e5tyary el expire date 4d 4 days lw mktbtsh hayb2a sale7 ll abd
    //const token = jwt.sign({id: user._id, isAdmin: user.isAdmin},process.env.JWT_SECRET_KEY);
    //ba3d el function eli esmaha generate token fl user model
    const token = user.generateToken();
    const {password, ...other} = user._doc;

    //deh kant btb3t el pass ll user //res.status(201).json(result);
    //lakn e7na la2 hanb3tlo el ...other w el token w msh hnb3t el pass b3d el hashing
    //lw el mail w el password s7 kda 5las
    res.status(200).json({...other,token});
  })


  export {
    register,
    login
  }