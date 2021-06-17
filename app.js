const express = require("express");
const app = express();

const path = require("path");

const mainRoutes = require("./routes/main");

//Using EJS for views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", mainRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server running on PORT ${PORT}`);
});
