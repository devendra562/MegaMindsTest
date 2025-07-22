const express = require("express");
const router = express.Router();
const userController = require("../controller/user_controller");

router.get("/listData", userController.listData);
router.post("/updateData", userController.updateData);
module.exports = router;