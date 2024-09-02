const express = require("express");
const authMiddleware = require("../middlewares/userAuth");
const checkRoles = require("../middlewares/roleCheck");
const {
  createWallet,
  addFunds,
  getUserWallets,
} = require("../controllers/walletController");

const router = express.Router();

router.post(
  "/wallet",
  authMiddleware,
  checkRoles(["User", "Admin", "Accountants", "Controller"]),
  createWallet
);
router.post(
  "/wallet",
  authMiddleware,
  checkRoles(["Admin", "Accountants"]),
  addFunds
);

router.get(
  "/wallet",
  authMiddleware,
  checkRoles(["Admin", "Accountants", "User"]),
  getUserWallets
);

module.exports = router;
