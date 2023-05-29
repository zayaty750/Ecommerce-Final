import HttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import session, { Cookie } from "express-session";
import MongoStore from 'connect-mongo';
import logger from "morgan";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();


//import routes
import index_router from "./routes/index.js";
import products_router from "./routes/products.js";
import { error } from "console";
import cart_router from "./routes/cart.js";
import User_router from "./routes/user.js";
import chatbot_router from "./routes/chatbot.js";
import admin_router from "./routes/admin.js";
import products_testing_router from "./routes/product_test.js";
import mongoose from "mongoose";

//Read the current directory name
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(session({
  secret: "xa",
  saveUninitialized: false,
  resave: false,
  store: MongoStore.create({ 
    mongoUrl: process.env.dbURI}),
  Cookie: { maxAge: 180 * 60 * 1000 }
  // 180min in cookies
} ));
app.set("view engine", "ejs");

//Setup middlewares

// setup logger middleware
// app.use(
//   logger("tiny", {
//     stream: fs.createWriteStream("./logs/access.log", { flags: "a" }),
//   })
// );
// app.use(
//   logger(":method :url :status :res[content-length] - :response-time ms")
// );

//setup json middleware
app.use(express.json());

//When extended property is set to true, the URL-encoded data will be parsed with the qs library.
//qs library allows you to create a nested object from your query string.

// When extended property is set to false, the URL-encoded data will instead be parsed with the query-string library.
// query-string library does not support creating a nested object from your query string.

app.use(express.urlencoded({ extended: true }));
//setup cookie parser middleware
app.use(cookieParser());
//setup static folder for serving static files in Express
app.use(express.static(path.join(__dirname, "public")));

//setup routes
app.use("/", index_router);
app.use("/product_dashboard", products_router);
//app.use('/products', logger('combined'), products_router);
app.use("/cart",cart_router);
app.use("/products",products_testing_router);
app.use("/admin",admin_router);
app.use("/user",User_router);
app.use("/chatbot",chatbot_router);

app.use(function ( req, res, next) {

    res.locals.session = req.session;
    next();
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("pages/error",{ user: (req.session.user === undefined ? "" : req.session.user) });
});

//connect to mongodb
//mongoose.connect(app.get('ATLAS_URI'));

console.log("ENV: ", app.get("env"));

export default app;