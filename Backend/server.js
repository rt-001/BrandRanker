const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");
const expRoutes = require("./routes/experimentRoutes");
const PORT = 8000;
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌  MONGO_URI is not defined in .env");
  process.exit(1);
}
app.use("/api/auth", authRoutes);
app.use("/api/experiments", expRoutes);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend is up at port ${PORT}.`);
  mongoose.set("strictQuery", true);
  mongoose
    .connect(mongoUri)
    .then(() => console.log("Established a connection with the database"))
    .catch((err) => console.log("Error connecting to database", err));
});
