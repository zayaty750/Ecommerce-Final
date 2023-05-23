import HttpError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import fs from "fs";


//import routes
import index_router from "./routes/index.js";
import products_router from "./routes/products.js";
import { error } from "console";

//Read the current directory name
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(`Project Root dir : ${__dirname}`);

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Setup middlewares

//setup logger middleware
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
app.use("/api/products", products_router);
//app.use('/products', logger('combined'), products_router);



// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("pages/error");
});

//connect to mongodb
//mongoose.connect(app.get('ATLAS_URI'));

console.log("ENV: ", app.get("env"));

export default app;