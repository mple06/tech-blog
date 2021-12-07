const express = require('express');
const router = express.Router();
const frontEndRoutes = require("./frontEndRoutes.js");
const apiRoutes = require("./api");
const sessionRoutes = require("./sessionsRoutes")

router.use(frontEndRoutes);
router.use("/api", apiRoutes);
router.use("/sessions", sessionRoutes)

module.exports = router;