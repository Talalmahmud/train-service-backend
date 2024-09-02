const express = require("express");
const {
  getALLStation,
  getStationById,
  updateStation,
  createStation,
} = require("../controllers/stationContoller");
const authMiddleware = require("../middlewares/userAuth");
const checkRoles = require("../middlewares/roleCheck");

const router = express.Router();

router.get("/station", getALLStation);
router.get("/station/:stationId", getStationById);
router.post(
  "/station/:stationId",
  authMiddleware,
  checkRoles(["Admin", "Controller"]),
  updateStation
);
router.post(
  "/station",
  authMiddleware,
  checkRoles(["Admin", "Controller"]),
  createStation
);

module.exports = router;
