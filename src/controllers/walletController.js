const User = require("../models/userModel");
const Wallet = require("../models/wallletModel");

const createWallet = async (req, res) => {
  try {
    const { userId } = req.user;
    const { name } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newWallet = new Wallet({
      user: userId,
      name: name,
      balance: 0,
    });

    await newWallet.save();

    user.wallets.push(newWallet._id);
    await user.save();

    res.status(201).json({
      message: "Wallet created successfully",
      wallet: newWallet,
    });
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({
      message: "Error creating wallet",
      error: error.message,
    });
  }
};

const getUserWallets = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).populate("wallets");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Wallets retrieved successfully",
      wallets: user.wallets,
    });
  } catch (error) {
    console.error("Error retrieving wallets:", error);
    res.status(500).json({
      message: "Error retrieving wallets",
      error: error.message,
    });
  }
};

const addFunds = async (req, res) => {
  try {
    const { walletId, amount } = req.body;

    const wallet = await Wallet.findById(walletId);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    wallet.balance += amount;
    await wallet.save();

    res.status(200).json({
      message: "Funds added successfully",
      wallet,
    });
  } catch (error) {
    console.error("Error adding funds:", error);
    res.status(500).json({
      message: "Error adding funds",
      error: error.message,
    });
  }
};

module.exports = { getWallet };

module.exports = {
  createWallet,
  getUserWallets,
  addFunds,
};
