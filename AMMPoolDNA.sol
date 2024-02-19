// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;


interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
}

contract AMMPool {
    event debugger(uint msge, uint,uint);
    event debuggerr(string msge);
    event DepositMade(address sender, uint total, uint aToB);    

    address public _TokenA;
    address public _TokenB;

    uint public supplyTokenA;
    uint public supplyTokenB;

    uint private ADecimals;
    uint private BDecimals;
    uint private magicnumber;


    uint public decimalMultiplier = 10**18;

    uint private K = 0;
constructor(address TokenA, address TokenB) {
        require(TokenA != TokenB, "AMMPool: EQUAL TOKEN PAIRS. FAIL");
        require(TokenA != address(0) && TokenB != address(0), "AMMPool: ZERO ADDRESS. FAIL");
        _TokenA = TokenA;
        _TokenB = TokenB;
    }

    function CreateSwap(bool fromA, uint256 amount) public {
    require(amount > 0, "Amount must be greater than 0");
    uint256 normalizedAmount = fromA ? normalizeAmount(amount, ADecimals, magicnumber) : normalizeAmount(amount, BDecimals, magicnumber);
    
    uint256 amountOut;
    if (fromA) {
        uint256 normalizedSupplyA = normalizeAmount(supplyTokenA, ADecimals, magicnumber);
        uint256 newSupplyTokenA = normalizedSupplyA + normalizedAmount;
        uint256 newSupplyTokenB = K / newSupplyTokenA;
        uint256 normalizedSupplyB = normalizeAmount(supplyTokenB, BDecimals, magicnumber);
        amountOut = normalizedSupplyB - newSupplyTokenB;
        supplyTokenA += amount;
        supplyTokenB -= amountOut / (10 ** (magicnumber - BDecimals));
    } else {
        uint256 normalizedSupplyB = normalizeAmount(supplyTokenB, BDecimals, magicnumber);
        uint256 newSupplyTokenB = normalizedSupplyB + normalizedAmount;
        uint256 newSupplyTokenA = K / newSupplyTokenB;
        uint256 normalizedSupplyA = normalizeAmount(supplyTokenA, ADecimals, magicnumber);
        amountOut = normalizedSupplyA - newSupplyTokenA;
        supplyTokenB += amount;
        supplyTokenA -= amountOut / (10 ** (magicnumber - ADecimals)); 
    }
    if (fromA) {
        require(IERC20(_TokenA).transferFrom(msg.sender, address(this), amount), "Transfer A failed");
        require(IERC20(_TokenB).transfer(msg.sender, amountOut / (10 ** (magicnumber - BDecimals))), "Swap failed: Token B transfer failed");
    } else {
        require(IERC20(_TokenB).transferFrom(msg.sender, address(this), amount), "Transfer B failed");
        require(IERC20(_TokenA).transfer(msg.sender, amountOut / (10 ** (magicnumber - ADecimals))), "Swap failed: Token A transfer failed");
    }

    
    }

    function GetMarketRate() public view returns (uint256) {
        uint256 normalizedSupplyA = normalizeAmount(supplyTokenA, ADecimals, magicnumber);
        uint256 normalizedSupplyB = normalizeAmount(supplyTokenB, BDecimals, magicnumber);
        uint256 newSupplyTokenA = normalizedSupplyA + 1*10**(magicnumber);
        uint256 newSupplyTokenB = K / newSupplyTokenA;
        return normalizedSupplyB - newSupplyTokenB;
    }


 function addLiquidity(uint256 amountA, uint256 amountB) public {
         try IERC20(_TokenA).decimals() returns(uint decimalsA){
            ADecimals = decimalsA;
        } catch {
            ADecimals = 18; // Default to 18 if decimals() function is not implemented
        }
        try IERC20(_TokenB).decimals() returns(uint decimalsB) {
            BDecimals = decimalsB;
        } catch {
            BDecimals = 18;
        }
        magicnumber = ADecimals >= BDecimals ? ADecimals : BDecimals;

        // Normalize amounts to the highest decimal count
        uint256 normalizedAmountA = normalizeAmount(amountA, ADecimals, magicnumber);
        uint256 normalizedAmountB = normalizeAmount(amountB, BDecimals, magicnumber);

        // Calculate the current ratio if the pool is not empty
        uint256 atoB = 0;
        if (supplyTokenA > 0 && supplyTokenB > 0) {
            uint256 normalizedSupplyA = normalizeAmount(supplyTokenA, ADecimals, magicnumber);
            uint256 normalizedSupplyB = normalizeAmount(supplyTokenB, BDecimals, magicnumber);
            atoB = (normalizedSupplyA * 1e18) / normalizedSupplyB; // Use e18 to add precision to the division
        }

        uint256 allowedDeviation = 1e18; // 100% deviation allowed for initial liquidity
        uint256 inputRatio = (normalizedAmountA * 1e18) / normalizedAmountB;
        require(
            atoB == 0 || (inputRatio >= atoB - allowedDeviation && inputRatio <= atoB + allowedDeviation),
            "Ratio mismatch"
        );

        // Transfer tokens to the pool
        require(IERC20(_TokenA).transferFrom(msg.sender, address(this), amountA), "Transfer A failed");
        require(IERC20(_TokenB).transferFrom(msg.sender, address(this), amountB), "Transfer B failed.");

        // Update supplies and invariant
        supplyTokenA += amountA;
        supplyTokenB += amountB;
        K = supplyTokenA * supplyTokenB; // Update K assuming no decimals for simplicity

        emit DepositMade(msg.sender, amountA + amountB, atoB);
    }

    // Helper function to normalize amounts to a target decimal count
    function normalizeAmount(uint256 amount, uint currentDecimals, uint256 targetDecimals) internal pure returns (uint256) {
        if (currentDecimals < targetDecimals) {
            return amount * (10**(targetDecimals - currentDecimals));
        } else if (currentDecimals > targetDecimals) {
            return amount / (10**(currentDecimals - targetDecimals));
        }
        return amount;
    }
}
