const Station = require("../models/stationModel");

const createStation = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newStation = await Station.create({ name, location });
    res.status(200).json({
      message: "Station is added.",
      newStation,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateStation = async (req, res) => {
  try {
    const { stationId } = req.params;
    const newStation = await Station.findByIdAndUpdate(stationId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!newStation) res.status(404).json({ message: "No station found." });

    res.status(200).json({
      message: "Station is updated.",
      newStation,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getStationById = async (req, res) => {
  try {
    const { stationId } = req.params;
    const station = await Station.findById(stationId);
    if (!station) res.status(404).json({ message: "No station found." });

    res.status(200).json({
      station,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getALLStation = async (req, res) => {
  try {
    const { stationId } = req.params;
    const station = await Station.find({});
    if (!station) res.status(404).json({ message: "No station found." });

    res.status(200).json({
      station,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createStation,
  getALLStation,
  updateStation,
  getStationById,
};
