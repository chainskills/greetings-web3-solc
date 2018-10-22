// To work with files and folders
const path = require("path");

// File system methods
const fs = require("fs-extra");

// Solidity compiler
const solc = require("solc");

// Clean up the build folder
const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

// Get the path where is located the contract
const contractPath = path.resolve(__dirname, "contracts", "Greetings.sol");

// Read the content of the contract
const greetingsSource = fs.readFileSync(contractPath, "utf8");

// Compile the contract and returns its object
const output = solc.compile(greetingsSource, 1).contracts;

// Use or create the build folder
fs.ensureDirSync(buildPath);

// Create the JSON file and store the contract's object
fs.outputJsonSync(
  path.resolve(buildPath, "Greetings.json"),
  output[":Greetings"]
);

// Export greetings contract
module.exports = output[":Greetings"];