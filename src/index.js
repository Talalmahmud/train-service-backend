require("dotenv").config();
const express = require("express");

const app = express();

const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});
app.listen(PORT, () =>
  console.log(`Server is running on:http://localhost:${PORT}`)
);
