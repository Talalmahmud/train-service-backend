require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const dbConnect = require("./utils/db");
const PORT = process.env.PORT;
const userRoutes = require("./routes/userRoute");

dbConnect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () =>
  console.log(`Server is running on:http://localhost:${PORT}`)
);
