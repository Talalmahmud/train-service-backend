const express = require("express");
const {
  purchaseTicket,
  getTickets,
} = require("../controllers/ticketContoller");
const authMiddleware = require("../middlewares/userAuth");
const checkRoles = require("../middlewares/roleCheck");

const router = express.Router();

router.post("/ticket", authMiddleware, purchaseTicket);
router.get(
  "/ticket",
  authMiddleware,
  checkRoles(["Admin", "Controller"]),
  getTickets
);

module.exports = router;
