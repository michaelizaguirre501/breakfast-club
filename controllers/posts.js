const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().lean();
      res.render("feed.ejs", {
        posts,
      });
    } catch (err) {
      console.log(err);
    }
  },
  createPostForm: (req, res) => {
    res.render("createPost.ejs");
  },
  postNewPost: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        name: req.body.name,
        desc: req.body.desc,
        user: req.user.userName,
        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
      console.log(`Post ${req.body.name} created`);
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  likedPostsFeed: async (req, res) => {
    const posts = await Post.find();
    res.render("likedPosts.ejs", posts);
  },

  likePost: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      if (user.likedPhotos.includes(req.params.id)) {
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },

          {
            $pull: {
              likedPhotos: req.params.id,
            },
          }
        );
        console.log("includes");
      } else {
        await User.findOneAndUpdate(
          {
            _id: req.user.id,
          },

          {
            $addToSet: {
              likedPhotos: req.params.id,
            },
          }
        );
        console.log("no includes");
      }

      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
};
