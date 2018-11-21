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

The project is pre-configured to install:
* web3.js 1.0:
  * the wrapper to the Ethereum blockchain
    
* solc:
  * the solidity compiler 

## Step 3. Start your Ethereum node

Start Ganache and get the RPC server that could be: http://127.0.0.1:7545

The first account will be the **coinbase**, the default account used to deploy your contracts.

## Step 4. Configure your project

Open the file `deploy.js` and ensure that the RPC server matches the one defined on Ganache:

```
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
```

## Step 6. Build and deploy your contract

To deploy the contract, we will use Node.js to run the `deploy.js` script.

This script will first compile your contract through the `compile.js` script before deploying its bytecode to Ganache.


```
$ node deploy
```

The contract address will be deployed in the console.


## Step 6. Compile and deploy your smart contract

```
$ truffle migrate --reset
```

You will have to migrate (deploy) your smart contract each time your restart **testrpc**.

## Step 7. Metamask: connect to your local Ethereum node

Unlock the Metamask extension in Chrome, and switch it to the network "Localhost 8545".

## Step 8. Metamask: import your accounts

Import accounts defined in your testrpc Ethereum node.

If you used `starttestrpc.sh`, here are the 3 private keys defined in the script:
* 0x351494a5ae8f9b70a2a2fd482146ab4578f61d4d796685c597ec6683635a940e
* 0x4cd491f96e6623edb52719a8d4d1110a87d8d83e3fa86f8e14007cb3831c0a2b
* 0xef40e0d6ada046010b6965d73603cabae1a119ca804f5d9e9a9ce866b0bea7d

In Metamask, rename these accounts respectively:
* testrpc-coinbase
* testrpc-account1
* testrpc-account2

## Step 9. Run your frontend application

```
$ npm run dev
```

In your browser, open the following URL: http://localhost:3000

## Step 10. Metamask: switch to the `testrpc-account1` account

When you switch accounts or networks in Metamask, you have to refresh your  page to let your frontend application know about it.

## Step 11. Publish resumes

You can publish your resume.

Metamask will ask you to confirm the transaction before publishing your resume.

## Step 12. Interact with the smart contract:

From your console window in Terminal, you can use the Truffle console to inspect the status of your contract.

Here is a short example:

### Open the console:
```
$ truffle console
truffle(development)>
```

### Get an instance of the smart contract:
```
truffle(development)> Resumeum.deployed().then(function(instance) {app = instance; })
```
From now on, you can use the `app` variable to interact with your smart contract.

### List your accounts:
```
truffle(development)> web3.eth.accounts
[ '0x00d1ae0a6fc13b9ecdefa118b94cf95ac16d4ab0',   '0x1daa654cfbc28f375e0f08f329de219fff50c765',   '0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7' ]
```

### Get the price of the service:
```
truffle(development)> app.getPrice.call()
{ [String: '40000000000000000'] s: 1, e: 16, c: [ 400 ] }
```

### Change the price of the service (as the contract's owner):
```
truffle(development)> app.setPrice(40000000000000000, {from: web3.eth.accounts[0]})
```

### Get the balance of your smart contract:
```
truffle(development)> web3.fromWei(web3.eth.getBalance(Resumeum.address), "ether").toNumber()
```

### Get the balance of the account 1:
```
truffle(development)> web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]), "ether").toNumber()
```

### Watch for events:
```
truffle(development)> var resumeEvent = app.publishResumeEvent({}, {fromBlock: 0,toBlock: 'latest'}).watch(function(error, event) {console.log(event);})
```

### Get the list of resumes:
```
truffle(development)> app.getResume.call()
[ '0x1daa654cfbc28f375e0f08f329de219fff50c765',   'John',   'Doe',   'I’m an Ethereum developer',   'In the past year, I have created a lot of Ethereum smart contracts. My personal projects are available on Github',   'Belgium',   'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' ]
```

#
### Publish resumes (as accounts 1 and 2):
```
truffle(development)> app.publishResume("John", "Doe", "I’m an Ethereum developer", "In the past year, I have created a lot of Ethereum smart contracts. My personal projects are available on Github", "Belgium", "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png", {from: web3.eth.accounts[1], value: web3.toWei(0.02, "ether")} )

truffle(development)> app.publishResume("Jane", "Smith", "I'm an blockchain developer", "This is my summary", "United States", "http://i.pravatar.cc/300", {from: web3.eth.accounts[2], value: web3.toWei(0.02, "ether")})
```

### Get the addresses of the consultants that have published a resume:
```
truffle(development)> app.getConsultants()
[ '0x1daa654cfbc28f375e0f08f329de219fff50c765',   '0xc2dbc0a6b68d6148d80273ce4d6667477dbf2aa7' ]
```

### Get the detail of a resume owned by a consultant:
```
truffle(development)> app.resumes('0x1daa654cfbc28f375e0f08f329de219fff50c765') [ '0x1daa654cfbc28f375e0f08f329de219fff50c765',   'John',   'Doe',   'I\'m a developer',   'This is my summary',   'Belgium',   'http://i.pravatar.cc/300' ]
```

### Deactivate you smart contract:
Only required if you want to "kill" your smart contract:
```
truffle(development)> app.kill({from: web3.eth.accounts[0]})
```

## Tips

* Is Metamask slow ? try to disable and enable the extension. This happens sometimes, especially when we work with a private chain.
* When you switch accounts in Metamask, don't forget to refresh the page to make sure you get the current account set in Metamask.

## Learn more

If you want to know more about all the steps required to install, build and  deploy a Dapp, you can subscribe to our course available on Udemy: https://www.udemy.com/getting-started-with-ethereum-solidity-development

Have fun !!!

ChainSkills Team - 2017