if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// const User = require("./models/User");
// const Post = require("./models/Post");
const bcrypt = require("bcryptjs");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const helmet =require("helmet");
app.use(helmet());
const authRoutes = require("./routes/auth.js");
const postRoutes = require("./routes/posts.js");
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
app.use("/posts",postRoutes)


mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server Running on Port :${PORT}`))
  )
  .catch((err) => console.log(err));
