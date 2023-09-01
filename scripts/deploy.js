const { ethers } = require("hardhat");

async function main(){
    // for booToken
    // const BooToken = await ethers.getContractFactory("boo");
    // const BooDeploy = await BooToken.deploy();
    // await BooDeploy.deployed();
    // console.log("BooToken contract address :: ", BooDeploy.address);
    
    // for catswap token
    // const CatSwapToken = await ethers.getContractFactory("CatSwap");
    // const CatSwapDeploy = await CatSwapToken.deploy();
    // CatSwapDeploy.deployed();
    // console.log("\nCatSwap Token Contract address :: ", CatSwapDeploy.address);

    //for singleSwap token
    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
    const SingleSwapTokenDeploy = await SingleSwapToken.deploy();
    await SingleSwapTokenDeploy.deployed();
    console.log("\nSingleSwapToken contract address :: ", SingleSwapTokenDeploy.address);

    // //for multihopswap
    // const MultiHopSwap = await ethers.getContractFactory("MultiHopSwapers");
    // const MultiHopSwapDeploy = await MultiHopSwap.deploy();
    // await MultiHopSwapDeploy.deployed();
    // console.log("\nMultiHopSwap contract address :: ", MultiHopSwapDeploy.address);
}

main().catch((errors)=>{
    console.log(errors);
    process.exitCode = 1;
})