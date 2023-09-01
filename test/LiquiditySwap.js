const {expect} = require("chai");
const {ethers, network} = require("hardhat");


const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const DAIWhale = "0x60FaAe176336dAb62e284Fe19B885B095d29fB7F";
const USDCWhale = "0x51eDF02152EBfb338e03E30d65C15fBf06cc9ECC";


describe("testing liquidity provider contract", ()=> {
    let liquidityExample;
    let account;
    let dai;
    let usdc;

    before("liquidityExample", async() => {
        const signer = await ethers.getSigners();
        
        // deploy the liquidity contract ;

        const contract = await ethers.getContractFactory("LiquidityExample");
         liquidityExample = await contract.deploy();
        await liquidityExample._deployed();
        
         const daiInstance = await ethers.getContractAt("IERC20",DAI);
         dai = daiInstance;

         const usdcInstance = await ethers.getContractAt("IERC20",USDC);
         usdc = usdcInstance;

           
         // unlocking the account of the mainnet 
        //  const impersonateAccount = await ethers.getImpersonatedSigner(DAIWhale);

        await network.provider.request({
             method : "hardhat_impersonateAccount",
             params :[DAIWhale]
        });
    
         await network.provider.request({
             method : "hardhat_impersonateAccount",
             params : [USDCWhale]
         });

         const daiWhale = await ethers.getSigner(DAIWhale);
         const usdcWhale = await ethers.getSigner(USDCWhale);

        //  await usdcInstance.connect(daiWhale).transfer(DAIWhale, 1000 * (10 ** 18));
        
        // transfering dai and usdc to account[0]
         
        const daiAmount = (1000n * (10n ** 18n));
        const usdcAmount =1000n * (10n ** 6n);
        console.log(usdcAmount)

        console.log("total balance of dai in whale account:: ", await dai.balanceOf(DAIWhale));
        console.log("total balance of usdc in whale accoun  :: ", await usdc.connect(usdcWhale).balanceOf(USDCWhale));
         
        
        expect(await dai.balanceOf(DAIWhale)).to.be.gte(daiAmount);
        expect(await usdc.balanceOf(USDCWhale)).to.be.gte(usdcAmount);
         
        account = signer[0].address;

        await dai.connect(daiWhale).transfer(account, daiAmount);
        await usdc.connect(usdcWhale).transfer(account, usdcAmount,{
            gasLimit : 300000
        });
        
        // console.log("dai balance of account 0 after transfer:: ", await dai.balanceOf(account));
        // console.log("usdc balance of account 0 after transfer :: ", await usdc.balanceOf(account));

    });

    it("printing",async()=>{
      
        console.log("total balance of dai in whale account:: ",await dai.balanceOf(DAIWhale)/(1 * (10**18)));
        console.log("total balance of usdc in whale accoun  :: ",(await usdc.balanceOf(USDCWhale))/(1 * (10 ** 6)));

        console.log("\n\n\ndai balance of account 0 after transfer:: ",ethers.utils.formatEther(await dai.balanceOf(account)));
        console.log("usdc balance of account 0 after transfer :: ",await usdc.balanceOf(account)/(10 ** 6));

    });
   
    it("minting new position", async() => {
       const liqAdd =(liquidityExample.address);
       await dai.transfer(liqAdd, (1000n * (10n**18n)));
       await usdc.transfer(liqAdd,(1000n * (10n ** 6n)));

       console.log("\n balance of the contract liquidity dai :: " , await dai.balanceOf(liqAdd)/(10 ** 18));
       console.log("\n balance of the liquidity provider contract usdc :: ",await usdc.balanceOf(liqAdd)/(10 ** 6));

      const info = (await liquidityExample.mintNewPosition());
      const reciept = await info.wait();
      console.log("all info about the position :: ", info);
      
    });


})
