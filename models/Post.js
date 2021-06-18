const mongoose = require("mongoose");

const PostSchema = new mongoose.PostSchema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  
  
  
  cloudinaryId: {
    type: String,
    require: true,
  },
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})