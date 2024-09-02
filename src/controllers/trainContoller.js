const Train = require("../models/trainModel");
const Station = require("../models/stationModel");

const createTrain = async (req, res) => {
  try {
    const { trainNumber, trainName, stops } = req.body;

    // Check if any stop conflicts with existing train schedules
    for (const stop of stops) {
      const conflictingTrain = await Train.findOne({
        "stops.station": stop.station,
        $or: [
          { "stops.arrivalTime": stop.arrivalTime },
          { "stops.departureTime": stop.departureTime },
        ],
      });

      if (conflictingTrain) {
        return res.status(400).json({
          message: `Conflict detected: Train ${conflictingTrain.trainNumber} already has a schedule at station ${stop.station} with overlapping times.`,
        });
      }
    }

    // If no conflicts, create the new train
    const newTrain = new Train({
      trainNumber,
      trainName,
      stops,
    });

    await newTrain.save();

    res.status(201).json({
      message: "Train created successfully",
      train: newTrain,
    });
  } catch (error) {
    console.error("Error creating train:", error);
    res.status(500).json({
      message: "Error creating train",
      error: error.message,
    });
  }
};

const updateTrain = async (req, res) => {
  try {
    const { trainId } = req.params; // Get the train ID from the request parameters
    const { trainNumber, trainName, stops } = req.body; // Get updated details from the request body

    // Check if any stop conflicts with existing train schedules (excluding this train)
    for (const stop of stops) {
      const conflictingTrain = await Train.findOne({
        _id: { $ne: trainId }, // Exclude the current train
        "stops.station": stop.station,
        $or: [
          { "stops.arrivalTime": stop.arrivalTime },
          { "stops.departureTime": stop.departureTime },
        ],
      });

      if (conflictingTrain) {
        return res.status(400).json({
          message: `Conflict detected: Train ${conflictingTrain.trainNumber} already has a schedule at station ${stop.station} with overlapping times.`,
        });
      }
    }

    // Update the train if no conflicts are found
    const updatedTrain = await Train.findByIdAndUpdate(
      trainId,
      {
        trainNumber,
        trainName,
        stops,
      },
      { new: true }
    );

    if (!updatedTrain) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.status(200).json({
      message: "Train updated successfully",
      train: updatedTrain,
    });
  } catch (error) {
    console.error("Error updating train:", error);
    res.status(500).json({
      message: "Error updating train",
      error: error.message,
    });
  }
};

const getTrain = async (req, res) => {
  try {
    const { trainId } = req.params;

    const train = await Train.findById(trainId).populate(
      "stops.station",
      "name location"
    );

    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    res.status(200).json({
      message: "Train retrieved successfully",
      train,
    });
  } catch (error) {
    console.error("Error retrieving train:", error);
    res.status(500).json({
      message: "Error retrieving train",
      error: error.message,
    });
  }
};

const getAllTrain = async (req, res) => {
  try {
    const trains = await Train.find({});

    res.status(200).json({
      trains,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving train",
      error: error.message,
    });
  }
};

module.exports = { createTrain, updateTrain, getTrain, getAllTrain };
