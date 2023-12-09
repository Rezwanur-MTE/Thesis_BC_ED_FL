const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
