require("dotenv").config({ path: "./config/config.env" });

//Start express
const express = require("express");
const app = express();

//Require rest of packages
const morgan = require("morgan");

//Require DataBase
const connectDb = require("./db/connect");

//Require Routes

const userRoute = require("./routes/UserRoute");
const productRoute = require("./routes/productRoute");
//Require middleware
const errorHandlerMiddleware = require("./middlewares/errorHandler");
//Invoke packages
app.use(morgan("tiny"));
app.use(express.json());

//Welcome end point
app.get("/", (req, res) => {
  res.send("<h1>Welcome Page</h1>");
});

//Invoke Routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);

//Invoke middleware
app.use(errorHandlerMiddleware);

//Connect to server and Database
const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await connectDb(process.env.DATABASE);
    app.listen(port, () => {
      console.log(`🚀 Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
