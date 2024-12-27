const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

//dot en configuration
dotenv.config();

// DB Connection
connectDb();

//rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
// URL => http://localhost:8080
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'));
app.use("/api/v1/category", require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));
app.use("/api/v1/order", require("./routes/orderRoutes"));

app.get("/", (req, res) => {
    return res
      .status(200)
      .send("Welcome to Food Server App API base Project");
  });
  
  //PORT
  const PORT = process.env.PORT || 8000;
  
  //listen
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });