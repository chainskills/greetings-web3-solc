# Greetings - Say hello to Ethereum
Sample Ethereum smart contract to change the greetings message.

Follow the steps described below to install, deploy and interact with the contract.

## Prerequisites: Install tools and frameworks

To build, deploy and test your smart contract locally, you need to install the following tools and frameworks:
* **node.js and npm**: https://nodejs.org/en/
  * You can install the LTS (Long Term Support) version related to your environment.

* **Ganache**: https://truffleframework.com/ganache
  * Your personal Ethereum blockchain.


## Structure of the project

The project contains the following files and folders:
* **compile.js**: compile your smart contract using the Solidity compiler (`solc`) and store the result into the `build` folder.
* **deploy.js**: use the Web3 library to connect to the Ethereum node, get all accounts and deploy the bytecode of contract.
* **contracts/Greetings.sol**: your smart contract written in Solidity.

## Step 1. Clone the project

`https://github.com/chainskills/greetings-web3-1.0.git`

## Step 2. Install all dependencies

```
$ cd greetings-web3-1.0
$ npm install
```

The project is preconfigured to install:
* web3.js (version 1.0 beta 36):
  * the wrapper to the Ethereum blockchain
    
* solc (version 0.4.25):
  * the solidity compiler 

## Step 3. Start your Ethereum node

Start Ganache and get the RPC server that could be: http://127.0.0.1:7545

The first account will be the default account used to deploy your contracts.

## Step 4. Configure your project

Open the file `deploy.js` and ensure that the RPC server matches the one defined on Ganache:

```
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
```

## Step 5. Build and deploy your contract

To deploy the contract, we will use Node.js to run the `deploy.js` script.

This script will first compile your contract using the `compile.js` script before deploying the bytecode to Ganache.

### Step 5-1. Deploy the contract

```
$ node deploy
contract address:  0xd8715266789bA8e3e168a89DbD8be1ab6975f085
```

The contract address will be displayed in the console.

Open Transactions view on Ganache. You should find a transaction identified as `CONTRACT CREATION`.

Check this transaction to read its properties (block number, gas limit, gas used, gas price, etc.).

### Step 5-2. Inspect the JSON file

Open the JSON file generated during the build process. The file is located under the `build` folder.

At the end of the file, you will find the following entries:
* **interface**: this is the ABI (Application Binary Interface) describing the functions exposed by the contract. The ABI will be required later.
* **runtimeBytecode**: the bytecode version of the compiled contract.
* **opcodes**: the resulting assembly code that will be executed by the EVM.

## Step 6. Interact with the contract

### Step 6-1. Open a Node console:

```
$ node
>
```

### Step 6-2. Configure the wrapper to the Ethereum:

```
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")) 
```

### Step 6-3: Retrieve accounts

```
> web3.eth.getAccounts().then(function(_accounts) {accounts = _accounts})

> accounts
```

The variable `accounts` displays an array of all accounts defined in Ganache.


### Step 6-4: Retrieve the ABI (Application Binary Interface)

The ABI described the functions exposed by the smart contract. 

We will retrieve the ABI from the JSON file generated in the build folder during the compile process.

First, we read and parse the JSON file:
```
> contractPath = path.resolve("./Build/Greetings.json")
> contractFile = fs.readFileSync(contractPath, "utf8")
> contractJSON = JSON.parse(contractFile)
```

We retrieve the ABI part located in the interface part:

```
> abi = JSON.parse(contractJSON.interface)
```

### Step 6-5: Get an instance to the contract

We are ready to get an instance to the smart contract.

Use the contract address displayed to you during the deploy process:

```
> instance = new web3.eth.Contract(abi, "0xd8715266789bA8e3e168a89DbD8be1ab6975f085")
```

## Step 7: Read the state variable

We can call the getGreetings public function to retrieve the state variable with the value initialised in the constructor:

```
> instance.methods.getGreetings().call().then(console.log)
I am ready!
```

If you check the Transactions view in Ganache, you will notice that no new transactions have been created. This is because the `getGreetings` function is a `view` function that doesn't alter the state of the contract.
Calling this type of function is free!

## Step 8: Change the message

We call the setGreetings public function to change the state variable stored within the contract.

This call will create a transaction with a gas fee to pay by the sender.

```
> instance.methods.setGreetings("Hello ChainSkills!").send({from: accounts[0]}).on('transactionHash', function(hash){console.log(hash)})
0xd21c2e807be7d3f077dd7aa0a6a30d2646f33d77c82f2030f5b2cf0c4acc64e7
```

The call sends the new message `Hello ChainSkills!` to the contract. The first account will pay the transaction fee.

The call displays the transaction hash.

You can switch to Ganache to inspect the transaction of type `CONTRACT CALL`. Some information is visible such as the gas used and the data in hexadecimal sent to the contract.

The web site `Code beautify` (https://codebeautify.org/hex-string-converter) allows to convert the hexadecimal to a string.

## Step 9: Read the state variable

We can call the getGreetings function to retrieve the state variable to check if the variable has been properly modified:

```
> instance.methods.getGreetings().call().then(console.log)
Hello ChainSkills!
```

Great, it works!

You can exit the Node console:

```
> .exit
``` 

## Learn more

If you want to know more about all the steps required to install, build and  deploy a Dapp, you can subscribe to our course available on Udemy: https://www.udemy.com/getting-started-with-ethereum-solidity-development

Have fun !!!

ChainSkills Team - 2018