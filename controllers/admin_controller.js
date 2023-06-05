import { mongo } from "mongoose";
import { User } from "../models/user-model.js";
import { render } from "ejs";
import fs from 'fs';


const getTeam = async (req, res, next) => {
    if (req.session.user.isAdmin === true) {
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

export { getTeam };