const {ethers} = require("hardhat");
const {expect} = require("chai");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";



describe("swapToken", ()=>{
    let accounts
     let swapToken;
     let contract;
     let weth9;
     let dai;
     let usdc;
     before("SingleSwapToken", async()=>{
          accounts = await ethers.getSigners();
          
        //   const exactCon = await ethers.getContractFactory("exact");
        //   const  deployExact = await exactCon.deploy();
        //   const exactAddress = deployExact.address;

          swapToken = await ethers.getContractFactory("SingleSwapToken");
          contract = await swapToken.deploy();
          await contract.deployed();

           weth9 = await ethers.getContractAt("IWETH9",WETH9);
           dai = await ethers.getContractAt("IERC20", DAI);
           usdc = await ethers.getContractAt("IERC20",USDC);
          
         
     })

     it("swapExactInputSingle", async() =>{
         console.log("accounts :: ",accounts[0].address);
         //console.log("\nSwapToken :: ", swapToken.interface.functions);
         console.log("\n\n\ncontract :: ", contract.address);
        //  console.log("\nweth9 instance :: ", weth9);
        //  console.log("\ndai instance :: ", dai);
        //  console.log("\nusdc instance :: ", usdc);
        
     })

     it("checkTheSingleInputSwap", async() => {
           const EthAmount = ethers.utils.parseEther("1");
           
        
            const val = {value : EthAmount};
           await weth9.deposit(val);
         console.log("\n\n\nbalance in weth :: ",ethers.utils.formatEther(await weth9.balanceOf( accounts[0].address)))

           const _approve = await weth9.approve(contract.address, EthAmount);
           console.log("\napproved :: ", _approve);

           const ammountOut = await contract.swapExactInputSingle(EthAmount);
           console.log("\n\n\nammountOut dai :: ", ammountOut);

           const bal = await dai.balanceOf(accounts[0].address);
           console.log("\n\n\ndai balance :: ",ethers.utils.formatEther(bal));
        
           

        
     });

     it("checkTheSwapExactOutputSingle", async() => {
         const EthAmount = ethers.utils.parseEther("1");
         await weth9.deposit({value : EthAmount});
         
         const approve = await weth9.approve(contract.address, EthAmount);
         
         const balofdaibefore = await dai.balanceOf(accounts[0].address);
         const balofWethbefore = await weth9.balanceOf(accounts[0].address);


        const totalDai = ethers.utils.parseEther("1000");
        const amountIn = await contract.swapExactOutputSingle(totalDai, EthAmount);
        console.log("total amount IN weth9 :: ", amountIn);
        
        const balofdai = await dai.balanceOf(accounts[0].address);
        const balofWethAfter = await weth9.balanceOf(accounts[0].address);
        
        console.log("\n\n\nbal of dai after before :: ", ethers.utils.formatEther(balofdaibefore));
        console.log("bal of weth9 after before :: ", ethers.utils.formatEther(balofWethbefore));
        
        console.log("\n\n\n\nbal of dai after swap :: ", ethers.utils.formatEther(balofdai));
        console.log("bal of weth9 after swap :: ", ethers.utils.formatEther(balofWethAfter));
     })
})
