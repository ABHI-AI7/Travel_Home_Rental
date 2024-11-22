const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");


const authRoutes = require("./routes/auth.js")
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoutes)

// MONGOOSE SETUP //
const PORT = 3005;
mongoose.connect(process.env.MONGO_URL, {
    dbName: "Stayzen_Rentals"
  })  // No need for useNewUrlParser and useUnifiedTopology anymore
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err)); 