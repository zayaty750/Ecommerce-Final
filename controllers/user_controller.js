import { mongo } from "mongoose";
import 
    {User,
    validateRegisterUser,
    validateLoginUser}
   from "../models/user-model.js";
   import {Cart}
   from  "../models/cart-model.js";
   import Orders
   from  "../models/order-model.js";

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

  req.session.user = user;
  try {
    await User.create(user);
    res.redirect("/");
  } catch (err) {
    //if there is an error, send it to the error handler
    next(err);
  }
};

//user profileview , edit and update
const edituserprofile=async(req,res)=>{
try{
  const id=req.query.id;
  const userdata =await User.findById({_id:id});
  if(userdata){
    res.redirect('/editprofile',{user:userdata});
  }else{
    res.redirect('/home');
  }
}
catch(error){
  console.log(error);
}
}
 


const updateprofile=async(req,res)=>{


    const id = req.params.id;
    if (!mongo.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }
    console.log(req.body);
    const user = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(user);
    req.session.user = user;
    if (user) {
      res.redirect("/profile");
    } else {
      res.status(404).json({ message: "Product not found" });
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
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  Stripe.customers.create({
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
            amount:  cart.totalPrice * 100,
            description: 'Web Development Product',
            currency: 'EGP',
            customer: customer.id
        })
    })
    .then((charge) => {
        const orders = 
        {
          client_id: req.session.user,
          product_id: cart,
          Address: req.body.Address,
          Street_name: req.body.Street_name,
          Building: req.body.Building,
          Floor: req.body.Floor,
          Apartment :req.body.Apartment,
          latit: req.body.latit,
          longit :req.body.longit,
        };
        Orders.create(orders);
        res.redirect("/");
    })
    .catch((err) => {
        res.send(err)
    })
}


export { addUser, getclients,GetUser, payment,edituserprofile,updateprofile };