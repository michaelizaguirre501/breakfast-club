const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const connectDB = require("./config/database");

const mainRoutes = require("./routes/main");


//Connect To Database
connectDB();

//Using EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
