const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const client = require("prom-client");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const { requestCount } = require("./monitering/requestCount");
const { requestGauge } = require("./monitering/requestGauge");
const { requestHistogram } = require("./monitering/requestHistogram");

const app = express();

//! Connect to MongoDB
mongoose
  .connect("mongodb+srv://admin:admin@cluster0.oaalese.mongodb.net/expense?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.error("DB Connection Error:", e));

//! Cors config
const corsOptions = {
  origin: ["https://expense-tracker-frontend-beryl-theta.vercel.app"],
};
app.use(cors(corsOptions));

//! Middlewares
app.use(express.json());

//! Monitoring Middlewares
app.use(requestCount);
app.use(requestGauge);
app.use(requestHistogram);

//! Root route
app.get("/", (req, res) => {
  res.send("Hi from backend");
});

//! Metrics route
app.get("/metrics", async (req, res) => {
  try {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  } catch (err) {
    console.error("Metrics Error:", err);
    res.status(500).send("Error generating metrics");
  }
});

//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

//! Error handling middleware
app.use(errorHandler);

//! Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
