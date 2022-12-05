const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
//Load config file
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();
//morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars view engine
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view-engine", ".hbs");

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
