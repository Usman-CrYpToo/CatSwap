
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
     compilers :[ 
      {
         version : "0.7.6",
         settings : {
          evmVersion : "istanbul",
           optimizer:{
              enabled : true ,
               runs : 1000
           }
         }
      }
     ]
  },
  
  networks:{
    hardhat:{
    forking:{
      url:"https://eth-mainnet.g.alchemy.com/v2/Y-Ra4UY2CUMTVUzfwwd8U8RU7jiJoARj"
    }
  }
  },
  mocha: {
    timeout: 90000 // Set a default timeout for all test cases (optional)
  },

  paths:{
    artifacts:"./frontend/src/contracts"
  }
};
