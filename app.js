const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const indexRoutes = require("./routes/indexRoutes");
const cookiePraser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

//middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookiePraser());

//view engine
app.set("view engine", "ejs");

//database connection
const dbURI = process.env.DB_URI || "mongodb://localhost:27017/node-auth";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("connected to db", "server is running on port 3000");
  })
  .catch((err) => console.log(err));

//routes
app.use(checkUser);
app.use(authRoutes);
app.use(indexRoutes);
