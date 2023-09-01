
const {ethers} = require("hardhat");


const artifacts = {
    UniswapV3Factory : require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),

    SwapRouter : require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),

    NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),

    NonFungiblePositionManager : require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),

    NonFungibleTokenPositionDescriptor : require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),

    WETH9 : require("@uniswap/v3-periphery/artifacts/contracts/interfaces/external/IWETH9.sol/IWETH9.json")
}


const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
    Object.keys(linkReferences).forEach((fileName) => {
      Object.keys(linkReferences[fileName]).forEach((contractName) => {
        if (!libraries.hasOwnProperty(contractName)) {
          throw new Error(`Missing link library name ${contractName}`)
        }
        const address = ethers.utils
          .getAddress(libraries[contractName])
          .toLowerCase()
          .slice(2)
        linkReferences[fileName][contractName].forEach(
          ({ start, length }) => {
            const start2 = 2 + start * 2
            const length2 = length * 2
            bytecode = bytecode
              .slice(0, start2)
              .concat(address)
              .concat(bytecode.slice(start2 + length2, bytecode.length))
          }
        )
      })
    })
    return bytecode
  }


async function main() {
       let owner = await ethers.getSigner();
    
    //    for Weth 
       const WETH9 = new ethers.ContractFactory(
        artifacts.WETH9.abi,
        artifacts.WETH9.bytecode,
          owner
        )
        const WethDeploy = await WETH9.deploy();
        console.log("weth contract address :: ", WethDeploy.address);


       //for uniswapv3factory 
       const UniswapV3Factory = new ethers.ContractFactory(
        artifacts.UniswapV3Factory.abi,
        artifacts.UniswapV3Factory.bytecode,
         owner
        )
        const UniswapV3FactoryDeploy = await UniswapV3Factory.deploy();
        console.log("UniswapV3Factory address :: ", UniswapV3FactoryDeploy.address);


        //for SwapRouter
        const SwapRouter = new ethers.ContractFactory(
            artifacts.SwapRouter.abi,
            artifacts.SwapRouter.bytecode,
            owner
        )
        const SwapRouterDeploy = await SwapRouter.deploy(UniswapV3FactoryDeploy.address, WethDeploy.address);
        console.log("SwapRouter Address :: ", SwapRouterDeploy.address);

    //     //for NftDescriptor 
        const NftDescriptor = new ethers.ContractFactory(
          artifacts.NFTDescriptor.abi,
          artifacts.NFTDescriptor.bytecode,
          owner
        )
        const NftDescriptorDeploy = await NftDescriptor.deploy();
        console.log("NftDescriptor address :: ", NftDescriptorDeploy.address);


        const linkedBytecode = linkLibraries(
            {
              bytecode: artifacts.NonFungibleTokenPositionDescriptor.bytecode,
              linkReferences: {
                "NFTDescriptor.sol": {
                  NFTDescriptor: [
                    {
                      length: 20,
                      start: 1261,
                    },
                  ],
                },
              },
            },
            {
              NFTDescriptor: NftDescriptorDeploy.address,
            }
          );
      

          const NonFungibleTokenPositionDescriptor = new ethers.ContractFactory(
             artifacts.NonFungibleTokenPositionDescriptor.abi,
             linkedBytecode.toString(),
             owner
          )

          const NonFungibleTokenPositionDescriptorDeploy = await NonFungibleTokenPositionDescriptor.deploy(WethDeploy.address);
          console.log("NonFungibleTokenPositionDescriptorDeploy :: ", NonFungibleTokenPositionDescriptorDeploy.address);

          const NonFungiblePositionManager  = new ethers.ContractFactory(
            artifacts.NonFungiblePositionManager.abi,
            artifacts.NonFungiblePositionManager.bytecode,
            owner
          )

          const NonFungiblePositionManagerDeploy = await NonFungiblePositionManager.deploy(UniswapV3FactoryDeploy.address, WethDeploy.address, NonFungibleTokenPositionDescriptorDeploy.address);
          console.log("NonFungiblePositionManagerDeploy ::: ",NonFungiblePositionManagerDeploy.address)

}

main()