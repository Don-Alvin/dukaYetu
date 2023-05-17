const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const corsOptions = require("./configs/cors/corsOptions");

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", products);
app.use("/api/v1", user);
app.use("/api/v1/", order);

// Middeleware to handle errors
app.use(errorMiddleware);

module.exports = app;
