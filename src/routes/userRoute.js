const express = require("express");
const {
  updateUser,
  createUser,
  loginUser,
} = require("../controllers/userContoller");
const authMiddleware = require("../middlewares/userAuth");

const router = express.Router();

router.post("/user", createUser);
router.post("/login", loginUser);
router.post("/update", authMiddleware, updateUser);

module.exports = router;
