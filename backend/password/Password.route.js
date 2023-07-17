const express = require("express");
const router = express.Router();
const passwordController = require("./Password.controller");

router.post("/", passwordController.createPassword);

router.get("/", passwordController.getPasswords);

module.exports = router;
