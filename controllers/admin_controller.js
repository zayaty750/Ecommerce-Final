import { mongo } from "mongoose";
import { User } from "../models/user-model.js";
import { render } from "ejs";
import fs from 'fs';
import bcrypt from "bcryptjs";

// View team
const getTeam = async (req, res, next) => {
    if (req.session.user.isAdmin == true) {
        const user = User.find({})
            .then((user) => {

                if (user.length > 0) {
                    user.sort((a, b) => {
                        const dateA = new Date(a.createdAt);
                        const dateB = new Date(b.createdAt);
                        return dateA - dateB;
                    });
                }
                //res.json(products);
                res.render('pages/team', { user: (req.session.user === undefined ? "" : req.session.user), user: user });
            }) //get all products
            .catch((err) => {
                next(err);
            });
    }
    else {
        res.render('pages/error');
    }
};

// Add admin
const addAdmin = async (req, res, next) => {
    console.log(req.body)
    if (req.session.user.isAdmin == true) {
      //get the admin data from the request body
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      
      const admin = {
        //create a new admin
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: true
      };
      console.log(admin);
      try {
        await User.create(admin);

        res.redirect("/team");
      } catch (err) {
        //if there is an error, send it to the error handler
        next(err);
      }
    }
    else {
      res.render('pages/error');
    }
  };

// Delete admin
const deleteAdmin = async ({ params: { id } }, res, next) => {

  try {
    if (!mongo.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `Error: Invalid product ID ${id}` });
    }
    const user = await User.findOneAndDelete({ _id: id });
    if (user) {
      console.log('data deleted to th')
      res.status(200).json({ message: "Admin removed" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    next(err);
  }
};

export { getTeam, addAdmin, deleteAdmin };