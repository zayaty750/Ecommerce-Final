import { mongo } from "mongoose";
import User from '../models/user-model.js';
import { render } from "ejs";
import fs from 'fs';


router.get('/team', (req, res)=> {
    if(req.session.user.isAdmin === true)
    {
      res.render('pages/team',{user: (req.session.user === undefined ? "" : req.session.user) });
    }
    else
    {
      res.render('pages/error');
    }
  });