if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const helmet =require("helmet");
const NodeCache = require( "node-cache" );
const fileUpload = require("express-fileupload");

const cache = new NodeCache();

cache.set('puzzleCount', 0);
cache.set('commitmentCount', 0);
cache.set('statementCount', 0);
cache.set('mysteryCount', 0);
cache.set('normalCount', 0);


app.use(helmet());
app.use(fileUpload());
var corsOptions = {
  credentials: true,
  origin: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.js");
const assetRoutes = require("./routes/asset.js");
const categoryRoutes = require("./routes/category.js");
const sub_categoryRoutes = require("./routes/sub_category.js");
const sub_sub_categoryRoutes = require("./routes/sub_sub_category.js");
const puzzleRoutes = require('./routes/puzzle.js');
const reportRoutes = require('./routes/report.js');
const keywordsRoute = require('./routes/keyword.js');
const commitmentAndStatementRoutes = require('./routes/commitment.js');


const CONNECTION_URL = process.env.DB_URL;
const PORT = process.env.PORT || 80;
app.use("/auth", authRoutes);
app.use("/asset",assetRoutes)
app.use("/category",categoryRoutes)
app.use("/sub_category",sub_categoryRoutes)
app.use("/sub_sub_category",sub_sub_categoryRoutes)
app.use("/puzzle", puzzleRoutes);
app.use("/report", reportRoutes);
app.use("/commitmentandstatement", commitmentAndStatementRoutes);
app.use("/keywords", keywordsRoute);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/crash', () => {
  process.exit();
});
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`server Running on Port :${PORT}`))
  )
  .catch((err) => console.log(err));
