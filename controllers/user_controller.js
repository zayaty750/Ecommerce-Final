import { mongo } from "mongoose";
import User from '../models/user-model.js';

// Get all clients
const getclients = async (req, res, next) => {
  const user = User.find({})
    .then((user) => {
      if (user.length > 0) {
        user.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA-dateB;
        });
      }
      res.render("pages/view_client", { user: user });
    }) //get all clients
    .catch((err) => {
      next(err);
    });
};

// Create a client
function generateUsername(fullName) {
  let firstName = fullName.split(' ')[0];
  let randomNumber = Math.floor(Math.random() * 1000);
return firstName+randomNumber;
}

const addUser = async (req, res, next) => {
  let username= generateUsername(req.body.name);
  
  //get the user data from the request body
  const imgPath = req.file.path;
  const imgURL = req.file.path.substring(req.file.path.indexOf("/") + 7);
  const user = {
    //create a new 
    name: username,
    email: req.body.email,
    password: req.body.password,
    type: req.body.type,
    Image: imgURL //remove public from the path
  };
  console.log(user);
  req.session.user = user;
  try {
    await User.create(user);
    res.redirect("/");
  } catch (err) {
    //if there is an error, send it to the error handler
    next(err);
  }
};

const GetUser = (req, res) => {
  var query = { name: req.body.name, password: req.body.password };
  console.log(req.body.name, req.body.password);
  User.findOne(query)
      .then(result => {
          if (!result) {
              console.log("data not found");
              res.render('pages/error', { err: 'Invalid Data', user: (req.session.user === undefined ? "" : req.session.user) });
          }
          else {
              req.session.user = result;  
              res.redirect('/');
          }
      })
      .catch(err => {
          console.log(err);
      });
};



export { addUser, getclients,GetUser };