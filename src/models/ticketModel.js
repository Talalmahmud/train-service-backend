const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    route: {
      startStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
      },
      endStation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Station",
        required: true,
      },
    },
    fare: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Booked", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
