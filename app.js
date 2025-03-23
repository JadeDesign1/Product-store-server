const express = require("express");
const DBconnect = require("./connectDB/db");
const cors = require("cors");
const productRouter = require("./routes/product.route"); // ✅ Correct import
const userRouter = require("./routes/user.route");

const app = express();
require("dotenv").config();
app.use(express.json());
app.use(cors());

// ✅ Middleware should receive a function, not an object
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

// ✅ Start Server
const port = 5000;
const start = async () => {
  try {
    await DBconnect();
    app.listen(port, () => {
      console.log(`🚀 Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
};

start();
