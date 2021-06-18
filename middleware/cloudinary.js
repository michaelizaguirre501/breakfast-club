const cloudinary = require("cloudinary");
require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: 834623119251245,
  api_secret: "T0Cksyn8mAYm__VSiIeJFx1yUvI",
});

module.exports = cloudinary;
