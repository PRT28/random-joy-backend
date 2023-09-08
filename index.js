if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const helmet =require("helmet");
app.use(helmet());
const authRoutes = require("./routes/auth.js");
const assetRoutes = require("./routes/asset.js");
const categoryRoutes = require("./routes/category.js");
const puzzleRoutes = require('./routes/puzzle.js');
const reportRoutes = require('./routes/report.js');
const commitmentAndStatementRoutes = require('./routes/commitment.js');
var corsOptions = {
  credentials: true,
  origin: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.Port || 4001;
app.use("/auth", authRoutes);
app.use("/asset",assetRoutes)
app.use("/category",categoryRoutes)
app.use("/puzzle", puzzleRoutes);
app.use("/report", reportRoutes);
app.use("/commitmentandstatement", commitmentAndStatementRoutes);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server Running on Port :${PORT}`))
  )
  .catch((err) => console.log(err));
