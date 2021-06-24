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
        likedBy: [],
      });
      console.log(`Post ${req.body.name} created`);
      res.redirect("../feed");
    } catch (err) {
      console.log(err);
    }
  },
  likedPostsFeed: async (req, res) => {
    const posts = await Post.find({
      likedBy: { $in: req.user.id },
    }).lean();
    res.render("likedPosts.ejs", { posts });
  },

  likePost: async (req, res) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      if (post.likedBy.includes(req.user.id)) {
        await Post.findOneAndUpdate(
          {
            _id: req.params.id,
          },

          {
            $pull: {
              likedBy: req.user.id,
            },
          }
        );
        console.log("includes");
      } else {
        await Post.findOneAndUpdate(
          {
            _id: req.params.id,
          },

          {
            $addToSet: {
              likedBy: req.user.id,
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
