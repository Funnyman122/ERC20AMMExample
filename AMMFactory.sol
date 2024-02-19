// SPDX-License-Identifier: UNLICENSED 
pragma solidity 0.8.21;

import "./Global.sol";
import "./AMMPoolDNA.sol";

contract Template is AMMPool {
    constructor(address TokenA, address TokenB) AMMPool(TokenA, TokenB) {
        require(TokenA != TokenB, "EQUAL TOKEN PAIRS. FAIL");
        require(TokenA != address(0) && TokenB != address(0), "ZERO ADDRESS. FAIL");
        _TokenA = TokenA;
        _TokenB = TokenB;
    }
}

contract WojakFactory is Global {
    struct Statistics {
    uint TokenABal;
    uint TokenBBal;
    string TokenASymbol;
    string TokenBSymbol;
    address TokenA;
    address TokenB;
    }

    event PoolCreated(address Address, string);
    
    function CreatePair(address TokenA, address TokenB) external returns(address) {
        require(TokenA != TokenB, "EQUAL TOKEN PAIRS. FAIL");
        require(TokenA != address(0) && TokenB != address(0), "ZERO ADDRESS. FAIL");
        require(Pair[TokenA][TokenB] == address(0) && Pair[TokenB][TokenA] == address(0), "PAIR EXISTS. FAIL");
        bytes32 salt = keccak256(abi.encodePacked(TokenA, TokenB));
        bytes memory bytecode = type(Template).creationCode;
        bytes memory encodedArguments = abi.encode(TokenA, TokenB);
        bytes memory combinedBytecode = abi.encodePacked(bytecode, encodedArguments);
        address pair;
        assembly {
            pair := create2(0, add(combinedBytecode, 32), mload(combinedBytecode), salt)
        }
        require(pair != address(0), "CREATE2_FAILED");
        Pair[TokenA][TokenB] = address(pair);
        Pair[TokenB][TokenA] = address(pair);
        emit PoolCreated(address(pair), string(abi.encodePacked("Pool Created, ", address(pair))));
        return address(pair);
    }

}