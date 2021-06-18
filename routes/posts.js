const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const mainController = require("../controllers/main");
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/createPost", ensureAuth, postsController.createPostForm);

router.post(
  "/newPost",
  upload.single("file"),
  ensureAuth,
  postsController.postNewPost
);

router.get("/likedPosts", ensureAuth, postsController.likedPostsFeed);

module.exports = router;
