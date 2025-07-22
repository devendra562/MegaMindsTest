const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/headerValidator");

const user_routes = require("./routes/user_routes");

router.use("/", middleware.extractHeaderLanguage);

// router.use("/", middleware.validateHeaderApiKey);

router.use("/user", user_routes);

module.exports = router;