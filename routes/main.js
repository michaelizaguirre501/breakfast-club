const express = require("express");
const router = express.Router();
const mainController = require("../controllers/main");
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts")

router.get("/", mainController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/dashboard", postsController.getDashboard);
module.exports = router;
