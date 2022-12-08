const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./database/database");
const morgan = require("morgan");
const passport = require("passport");
const exphbs = require("express-handlebars");
const session = require("express-session");
//Load config file
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

//express session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//passport config
require("./config/passport")(passport);

//morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//handlebars view engine
app.engine(".hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view-engine", ".hbs");

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
);
