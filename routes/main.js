const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/", ensureGuest, mainController.getIndex);
router.get("/login", ensureGuest, authController.getLogin);
router.post("/login", ensureGuest, authController.postLogin);
router.get("/logout", ensureAuth, authController.logout);
router.get("/signup", ensureGuest, authController.getSignup);
router.post("/signup", ensureGuest, authController.postSignup);
router.get("/feed", postsController.getFeed);

module.exports = router;
