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

// Read the abi and the bytecode from the contract
const params = {
    language: "Solidity",
    sources: {
        "contract": {
            content: fs.readFileSync(contractPath, 'utf-8')
        }
    },
    settings: {
        outputSelection: {
            "*": {
                "*": ["abi", "evm.bytecode"]
            }
        }
    }
};

// Compile the contract and returns its object
const output = JSON.parse(solc.compile(JSON.stringify(params)));

// Use or create the build folder
fs.ensureDirSync(buildPath);

// Create the JSON file and store the contract's object
fs.outputJsonSync(
    path.resolve(buildPath, "Greetings.json"),
    output.contracts.contract.Greetings
);

// Export greetings contract
module.exports.interface = output.contracts.contract.Greetings.abi;
module.exports.bytecode = output.contracts.contract.Greetings.evm.bytecode.object;