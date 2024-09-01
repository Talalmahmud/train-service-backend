const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      user: { name, email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user contains the authenticated user's info
    const { password } = req.body;

    if (!userId || !password) {
      return res.status(400).json({
        message: "User ID and password are required",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user by ID
    const newUser = await User.findOneAndUpdate(
      { _id: userId }, // Wrap userId in an object with the _id field
      { password: hashedPassword },
      { new: true, runValidators: true }
    );

    if (!newUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User password updated successfully",
      user: { name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({
      message: "Error updating password",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const payload = {
      userId: user._id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "3h",
    });

    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
};
