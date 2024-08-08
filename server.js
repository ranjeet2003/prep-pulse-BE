require("dotenv").config();

// const { chalk } = require("chalk");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/auth.route");
const subjectRoutes = require("./routes/subject.route");
const chapterRoutes = require("./routes/chapter.route");
const testRoutes = require("./routes/test.route");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const app = express();
// Middleware
const corsOptions = {
  origin: "https://prep-pulse-fe.vercel.app", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/chapters", chapterRoutes);
app.use("/api/tests", testRoutes);

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB
const mongoURL = process.env.MONGODB_URL;
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running" + " on port " + port);
});
