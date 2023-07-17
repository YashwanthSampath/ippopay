const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const passwordRoutes = require("./password/Password.route");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error while connecting to MongoDB:", err));

// Routes
app.use("/passwords", passwordRoutes);

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
