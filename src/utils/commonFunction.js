const Train = require("../models/trainModel");
const calculateFare = async (req, res) => {
  try {
    const { trainId, startStation, endStation } = req.body;

    // Validate train and route
    const train = await Train.findById(trainId).populate("stops.station");
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    const startStop = train.stops.find(
      (stop) => stop.station._id.toString() === startStation
    );
    const endStop = train.stops.find(
      (stop) => stop.station._id.toString() === endStation
    );

    if (
      !startStop ||
      !endStop ||
      endStop.arrivalTime <= startStop.departureTime
    ) {
      return res.status(400).json({ message: "Invalid route" });
    }

    const fare =
      Math.abs(endStop.arrivalTime - startStop.departureTime) / 60000; // Example: 1 unit per minute

    res.status(200).json({
      message: "Fare calculated successfully",
      fare,
    });
  } catch (error) {
    console.error("Error calculating fare:", error);
    res.status(500).json({
      message: "Error calculating fare",
      error: error.message,
    });
  }
};

module.exports = { calculateFare };
