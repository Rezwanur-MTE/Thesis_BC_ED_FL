const fs = require("fs");
const SHA256 = require("crypto-js/sha256");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
class Block {
  constructor(index, timestamp, data, previousHash = "", serverHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.serverHash = serverHash;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    this.miningTime = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    const startTime = new Date().getTime(); // Record the start time
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    const endTime = new Date().getTime(); // Record the end time
    this.miningTime = (endTime - startTime) / 1000; // Calculate mining time in seconds
    console.log("Block mined : " + this.hash);
    console.log("Mining time: " + this.miningTime + " seconds");
  }
}
module.exports = Block;
