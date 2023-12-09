const fs = require("fs");
const SHA256 = require("crypto-js/sha256");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Block = require("./block");
// class Block {
//   constructor(index, timestamp, data, previousHash = "", serverHash = '') {
//     this.index = index;
//     this.timestamp = timestamp;
//     this.data = data;
//     this.serverHash = serverHash;
//     this.previousHash = previousHash;
//     this.hash = this.calculateHash();
//     this.nonce = 0;
//   }

//   calculateHash() {
//     return SHA256(
//       this.index +
//         this.previousHash +
//         this.timestamp +
//         JSON.stringify(this.data) +
//         this.nonce
//     ).toString();
//   }

//   mineBlock(difficulty) {
//     while (
//       this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
//     ) {
//       this.nonce++;
//       this.hash = this.calculateHash();
//     }

//     console.log("Block mined : " + this.hash);
//   }
// }

class Blockchain {
  constructor() {
    this.loadBlockchainFromFile(); // Load the existing blockchain from file
    if (this.chain.length === 0) {
      this.chain.push(this.createGenesisBlock());
    }
    this.difficulty = 4;
    this.serverHash = this.createServerHash();
  }
  createGenesisBlock() {
    return new Block(
      0,
      `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      "Genesis Block",
      "0",
      this.createServerHash()
    );
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }
  createServerHash() {
    const ipAddress = process.env.SERVER_IP || "192.168.1.100"; // Use environment variable or default value
    const hostname = process.env.SERVER_HOSTNAME || "example-server"; // Use environment variable or default value
    const serverString = ipAddress + hostname;
    return crypto.createHash("sha256").update(serverString).digest("hex");
  }
  // Function to load existing blockchain from file if available
  loadBlockchainFromFile() {
    try {
      const fileData = fs.readFileSync("blockchain.json");
      this.chain = JSON.parse(fileData);
    } catch (error) {
      this.chain = [];
      console.error("Error loading blockchain from file:", error);
    }
  }
  // Function to save the blockchain data to a file

  saveBlockchainToFile() {
    const data = JSON.stringify(this.chain, null, 4);

    fs.writeFile("blockchain.json", data, (err) => {
      if (err) {
        console.error("Error writing blockchain data to file:", err);
      } else {
        console.log("Blockchain data has been saved to blockchain.json");
      }
    });
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    // newBlock.hash= newBlock.calculateHash();
    newBlock.mineBlock(this.difficulty);
    newBlock.serverHash = this.serverHash;
    this.chain.push(newBlock);
    // Save the updated blockchain to a file
    this.saveBlockchainToFile();
  }

  isChainValid() {
    for (let i = 1; i <= this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// let edgeCoin = new Blockchain();
// console.log(edgeCoin);
// console.log("Mining Block 17...");
// edgeCoin.addBlock(new Block(17, "09/12/2023", { amountBDT: 4 }));
// console.log("Mining Block 18...");
// edgeCoin.addBlock(new Block(18, "14/12/2023", { amount$: 7 }));
// // edgeCoin.addBlock(new Block(9, "16/12/2023", { amount$: 95 }));
// console.log(JSON.stringify(edgeCoin, null, 4));

module.exports = Blockchain;
