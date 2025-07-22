const express = require("express");
require("dotenv").config();
const cors = require('cors');

// Create express app
const app = express();
app.use(cors());

// Setup server port
const port = process.env.PORT || 5000;

/**
 * Code to parse request body
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const app_v1 = require("./modules/v1/route_manager");
app.use("/api/v1", app_v1);

// listen for requests
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Failed to start server.", error);
}