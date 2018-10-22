pragma solidity ^0.4.25;

contract Greetings {
    string message;
    
    constructor() public {
        message = "I am ready!";
    }
    
    function setGreetings(string _message) public {
        message = _message;
    }
    
    function getGreetings() public view returns (string) {
        return message;
    }
}