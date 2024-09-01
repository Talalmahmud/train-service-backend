const express = require("express");
const {
  getALLStation,
  getStationById,
  updateStation,
  createStation,
} = require("../controllers/stationContoller");

const router = express.Router();

router.get("/station", getALLStation);
router.get("/station/:stationId", getStationById);
router.post("/station/:stationId", updateStation);
router.post("/station", createStation);

module.exports = router;
