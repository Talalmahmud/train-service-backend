const Ticket = require("../models/ticketModel");
const Train = require("../models/trainModel");
const User = require("../models/userModel");
const Wallet = require("../models/wallletModel");

const purchaseTicket = async (req, res) => {
  try {
    const { userId, trainId, startStation, endStation, walletId } = req.body;

    // Validate user, train, and route
    const user = await User.findById(userId).populate("wallet");
    const train = await Train.findById(trainId).populate("stops.station");

    if (!user || !train) {
      return res.status(404).json({ message: "User or Train not found" });
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
      Math.abs(endStop.arrivalTime - startStop.departureTime) / 60000; // Fare based on time difference

    const wallet = user.wallets.find((w) => w._id.toString() === walletId);
    if (!wallet || wallet.balance < fare) {
      return res
        .status(400)
        .json({ message: "Insufficient funds in the selected wallet" });
    }
    wallet.balance -= fare;
    await wallet.save();

    const ticket = new Ticket({
      user: userId,
      train: trainId,
      route: { startStation, endStation },
      fare,
    });
    await ticket.save();
    const transaction = new Transaction({
      user: userId,
      wallet: walletId,
      ticket: ticket._id,
      amount: fare,
      transactionType: "Debit",
      description: `Ticket purchase for train ${train.name} from ${startStation} to ${endStation}`,
    });

    await transaction.save();
    res.status(201).json({
      message: "Ticket purchased successfully",
      ticket,
      transaction,
    });
  } catch (error) {
    console.error("Error purchasing ticket:", error);
    res.status(500).json({
      message: "Error purchasing ticket",
      error: error.message,
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    res.status(200).json({ tickets });
  } catch (error) {
    console.error("Error purchasing ticket:", error);
    res.status(500).json({
      message: "Error purchasing ticket",
      error: error.message,
    });
  }
};

module.exports = { purchaseTicket, getTickets };
