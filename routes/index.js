const express = require("express");
const router = express.Router();

//@desc Login/Landing Page
//@route GET /
router.get("/", (request, response) => {
  response.render("login.hbs", { layout: "login.hbs" });
});

//@desc Dashboard
//@route GET /dashboard

router.get("/dashboard", (request, response) => {
  response.render("dashboard.hbs");
});

module.exports = router;
