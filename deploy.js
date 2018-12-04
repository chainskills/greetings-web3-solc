// Library used to interct with Ethereum smart contract
const Web3 = require("web3");

// Get the Interface and bytecode object from compiled contract
const {interface, bytecode} = require("./compile");

// Create a new instance of web3 plugged to Ganache
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

// Implementation to deploy the contract
const deploy = async () => {
    // Retrieve the list of accounts
    const accounts = await web3.eth.getAccounts();

    // Create a contract with interface to the contract (Application Binary Interface - ABI)
    // Deploy the bytecode of the contract using the first account and defining the gas
    const result = await new web3.eth.Contract(interface)
        .deploy({
            data: bytecode
        })
        .send({from: accounts[0], gas: "1000000"});

    // Keep this address. It will be used to interact with the contract
    console.log("contract address: ", result.options.address);
};

// Deploy the contract
deploy();