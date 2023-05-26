import { mongo } from "mongoose";
import User from '../models/user-model.js';





// Create a product
const addUser = async (req, res, next) => {
  //get the user data from the request body
  const imgPath = req.file.path;
  const imgURL = req.file.path.substring(req.file.path.indexOf("/") + 7);
  const user = {
    //create a new 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    Image: imgURL //remove public from the path
  };
  console.log(user);
  try {
     await User.create(user);

    res.redirect("/");
  } catch (err) {
    //if there is an error, send it to the error handler
    next(err);
  }
};


export  {addUser};