const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the 'cors' package
const Blockchain = require("./conroller/main");
const Block = require("./conroller/block"); // Import Block class from controller/block.js

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware

// Initialize the blockchain outside of the endpoint handler
let edgeCoin = new Blockchain();

app.get("/", (req, res) => {
  res.send("Hello From Zishan!");
});

// Get all block information
app.get("/blocks", (req, res) => {
  res.status(200).json({ blocks: edgeCoin.chain });
});

// Calculate the number of blocks created in one-hour intervals from genesis block creation time
app.get("/blocks/created-per-hour", (req, res) => {
  const genesisBlockTimestamp = new Date(edgeCoin.chain[0].timestamp);
  const currentTime = new Date();

  const hourDifference = Math.floor(
    (currentTime - genesisBlockTimestamp) / (60 * 60 * 1000)
  ); // Total hours elapsed

  const blocksPerHour = {};

  for (let i = 0; i <= hourDifference; i++) {
    const startTimestamp = new Date(
      genesisBlockTimestamp.getTime() + i * 60 * 60 * 1000
    );
    const endTimestamp = new Date(
      genesisBlockTimestamp.getTime() + (i + 1) * 60 * 60 * 1000
    );

    const blocksInHour = edgeCoin.chain.filter(
      (block) =>
        new Date(block.timestamp) >= startTimestamp &&
        new Date(block.timestamp) < endTimestamp
    );

    blocksPerHour[`Hour ${i + 1}`] = blocksInHour.length;
  }

  res.status(200).json({ blocksPerHour });
});

// Get the count of connected servers (distinct serverHash values)
app.get("/servers/count", (req, res) => {
  const connectedServers = new Set(
    edgeCoin.chain.map((block) => block.serverHash)
  );
  res.status(200).json({ count: connectedServers.size });
});

// Get block information by hash
app.get("/blocks/:hash", (req, res) => {
  const { hash } = req.params;
  const block = edgeCoin.chain.find((block) => block.hash === hash);
  if (block) {
    res.status(200).json({ block });
  } else {
    res.status(404).json({ message: "Block not found" });
  }
});

// Get average mining time for all blocks
app.get("/average-mining-time", (req, res) => {
  try {
    const blockchainData = edgeCoin.chain; // Access blockchain data from edgeCoin instance

    const totalBlocks = blockchainData.length;

    // Calculate total mining time for all blocks
    const totalMiningTime = blockchainData.reduce(
      (acc, block) => acc + block.miningTime,
      0
    );

    // Calculate average mining time
    const averageMiningTime =
      totalBlocks > 0 ? (totalMiningTime / totalBlocks).toFixed(2) : 0;

    res.status(200).json({ averageMiningTime });
  } catch (error) {
    res.status(500).json({ error: "Error reading blockchain data" });
  }
});

app.get("/power-consumption", (req, res) => {
  try {
    const blockchainData = edgeCoin.chain; // Access blockchain data from edgeCoin instance

    const totalBlocks = blockchainData.length;

    // Calculate total mining time for all blocks
    const totalMiningTime = blockchainData.reduce(
      (acc, block) => acc + block.miningTime,
      0
    );

    // Calculate average mining time
    const totalPower = ((15 * totalMiningTime) / 1000).toFixed(2);

    res.status(200).json({ totalPower });
  } catch (error) {
    res.status(500).json({ error: "Error reading blockchain data" });
  }
});

// Get nonce number of the last block
app.get("/last-block-nonce", (req, res) => {
  try {
    const lastBlock = edgeCoin.chain[edgeCoin.chain.length - 1];
    const lastBlockNonce = lastBlock ? lastBlock.nonce : null;
    res.status(200).json({ lastBlockNonce });
  } catch (error) {
    res.status(500).json({ error: "Error reading blockchain data" });
  }
});

app.get("/last-block-index", (req, res) => {
  try {
    const lastBlock = edgeCoin.chain[edgeCoin.chain.length - 1];
    const lastBlockIndex = lastBlock ? lastBlock.index : null;
    res.status(200).json({ lastBlockIndex });
  } catch (error) {
    res.status(500).json({ error: "Error reading blockchain data" });
  }
})

app.post("/", (req, res) => {
  const tempData = req.body; // Assuming JSON data contains temperature and humidity

  const dataToSave = { data: tempData, timestamp: new Date() };

  const blockIndex = edgeCoin.chain.length; // Determine the index correctly based on the chain length

  const newBlock = new Block(blockIndex, `${new Date()}`, dataToSave);
  edgeCoin.addBlock(newBlock);

  res.status(200).json({ message: "Block added successfully", newBlock });
});

module.exports = app;
