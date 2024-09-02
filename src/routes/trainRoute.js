const express = require("express");
const {
  createTrain,
  getTrain,
  updateTrain,
  getAllTrain,
} = require("../controllers/trainContoller");
const authMiddleware = require("../middlewares/userAuth");
const checkRoles = require("../middlewares/roleCheck");

const router = express.Router();

router.post(
  "/train",
  authMiddleware,
  checkRoles(["Controller", "Admin"]),
  createTrain
);
router.get(
  "/train/:trainId",
  authMiddleware,
  checkRoles(["Controller", "Admin"]),
  getTrain
);
router.post("/train/:trainId", updateTrain);

router.get("/train", getAllTrain);

module.exports = router;
