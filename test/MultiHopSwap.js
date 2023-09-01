const { AddHomeWorkTwoTone } = require("@mui/icons-material");
const {expect} = require("chai");
const {ethers} = require("hardhat");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("MultiHop Token Swap Testing",()=>{
     let account;
     let contract ;
     let dai ;
     let weth9; 
     let usdc;

     before("getting instance ", async() => {
           account =await ethers.getSigners();

           const multiSwap = await ethers.getContractFactory("MultiHopSwapers");
           contract = await multiSwap.deploy();
           await contract.deployed();
             
           weth9 = await ethers.getContractAt("IWETH9",WETH9);
           dai = await ethers.getContractAt("IERC20", DAI);
           usdc = await ethers.getContractAt("IERC20",USDC);

     })
      it("print the info", async() => {
          console.log("accounts :: ",account[0].address);
          console.log("contract address :: ",contract.address);
      });

     it("swapExactInputMultihop", async() => {
     
         const ethAmount = ethers.utils.parseEther("1");
         
         await weth9.deposit({value : ethAmount});
         
         const balOfweth9 = await weth9.balanceOf(account[0].address);
         const balOfdai = await dai.balanceOf(account[0].address);

        const approved= await weth9.approve(contract.address, ethAmount);
         console.log("approved :: ", approved);
         
         console.log("bal of weth before :: ",ethers.utils.formatEther(balOfweth9));
         console.log("bal of dai before :: ",ethers.utils.formatEther(balOfdai));


       const amountOut =await contract.swapExactInputMultihop(ethAmount);
       console.log("amount out in dai :: " ,amountOut);
        
        const balOfweth9After = await weth9.balanceOf(account[0].address);
        const balofdaiAfter = await dai.balanceOf(account[0].address);
        console.log("bal of weth9 after :: " ,ethers.utils.formatEther(balOfweth9After));
        console.log("bal of dai after :: ",ethers.utils.formatEther(balofdaiAfter));
     })

     it("swapExactOutputMultihop", async() => {
          const ethAmount = ethers.utils.parseEther("1");
          await weth9.deposit({value: ethAmount});

          console.log(ethers.utils.formatEther(await dai.balanceOf(account[0].address)));
          console.log(ethers.utils.formatEther(await weth9.balanceOf(account[0].address)));

          const approved = await weth9.approve(contract.address, ethAmount);
          console.log("approve :: ",approved);

          const totalDai = ethers.utils.parseEther("1800");
          const ammountIn =await contract.swapExactOutputMultihop(totalDai, ethAmount);
          console.log("ammountIn :: ",ammountIn );

          console.log(ethers.utils.formatEther(await dai.balanceOf(account[0].address)));
          console.log(ethers.utils.formatEther(await weth9.balanceOf(account[0].address)));
     })
})