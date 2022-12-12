const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth.js");

//@desc Login/Landing Page
//@route GET /
router.get("/", ensureGuest, (request, response) => {
  response.render("login.hbs", { layout: "login.hbs" });
});

//@desc Dashboard
//@route GET /dashboard

router.get("/dashboard", ensureAuth, (request, response) => {
  response.render("dashboard.hbs");
});

module.exports = router;
