const express = require("express");
const {
  createTrain,
  getTrain,
  updateTrain,
  getAllTrain,
} = require("../controllers/trainContoller");

const router = express.Router();

router.post("/train", createTrain);
router.get("/train/:trainId", getTrain);
router.post("/train/:trainId", updateTrain);

router.get("/train", getAllTrain);

module.exports = router;
