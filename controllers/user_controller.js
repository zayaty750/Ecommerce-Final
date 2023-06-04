import { mongo } from "mongoose";
import 
    {User,
    validateRegisterUser,
    validateLoginUser}
   from "../models/user-model.js";

   import stripe from 'stripe';
   const Stripe = new stripe(process.env.SECRET_KEY);

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

//user profile edit and update



const updateprofile=async(req,res)=>{
  try{
    if(req.file){
      const userdata=await user.findByIdAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,password:req.body.password}})
  
    }else{
      const userdata=await user.findByIdAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name,email:req.body.email,password:req.body.password}})
  
    }
  res.redirect('/home')
  }catch(error)
  {
    console.log(error);
  }
  
  }
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

const payment = (req,res)=>{
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Blankoo',
    address: {
        line1: '23 Mountain Valley',
        postal_code: '110092',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India'
    }
})
    .then((customer) => {
        return stripe.charges.create({
            amount: 7000,
            description: 'Web Development Product',
            currency: 'USD',
            customer: customer.id
        })
    })
    .then((charge) => {
        console.log(charge)
        res.send("Success")
    })
    .catch((err) => {
        res.send(err)
    })
}


export { addUser, getclients,GetUser, payment };