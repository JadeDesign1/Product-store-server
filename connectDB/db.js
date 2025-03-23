const mongoose = require("mongoose");

const DBonnect = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .finally();
};

const disconnectDb = async () => {
  try {
    await mongoose.connection.close(); // Gracefully close the MongoDB connection
    console.log("Database connection closed.");
  } catch (error) {
    console.error("Error while closing database connection:", error);
  }
};

const shutdown = async () => {
  console.log("Shutting down the server...");
  await disconnectDb();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

module.exports = DBonnect;
