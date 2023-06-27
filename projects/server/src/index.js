const path = require("path");
require('dotenv').config({path:path.join(__dirname,'../.env')});
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
const bearerToken = require("express-bearer-token");
const imgMiddleware = require("./middleware/multer");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors({
    // origin: [
    //   process.env.WHITELISTED_DOMAIN &&
    //     process.env.WHITELISTED_DOMAIN.split(","),
    // ],
  })
);

app.use(express.json());
app.use("/Public", express.static(path.join(__dirname, "/Public")));
app.use(bearerToken());
app.use(bodyParser.json());

//#region API ROUTES

const { auth, profile, blog } = require("./routers");

// ===========================
// NOTE : Add your routes here

// user
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/blog", blog);

// admin

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
