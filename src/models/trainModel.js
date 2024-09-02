const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Station",
    required: true,
  },
  arrivalTime: {
    type: Date,
    required: true,
  },
  departureTime: {
    type: Date,
    required: true,
  },
});

const trainSchema = new mongoose.Schema(
  {
    trainNumber: {
      type: String,
      required: true,
      unique: true,
    },
    trainName: {
      type: String,
      required: true,
    },
    stops: [stopSchema], // Embedding stops schema
  },
  { timestamps: true }
);

const Train = mongoose.model("Train", trainSchema);
module.exports = Train;
