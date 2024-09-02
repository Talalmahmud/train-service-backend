require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const dbConnect = require("./utils/db");
const PORT = process.env.PORT;

//routes
const userRoutes = require("./routes/userRoute");
const stationRoutes = require("./routes/stationRoute");
const trainRoutes = require("./routes/trainRoute");

dbConnect();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", userRoutes);
app.use("/api/v1", stationRoutes);
app.use("/api/v1", trainRoutes);

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(PORT, () =>
  console.log(`Server is running on:http://localhost:${PORT}`)
);
