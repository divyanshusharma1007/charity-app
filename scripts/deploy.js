// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");


  async function getBalances(address) {
    const balanceBigInt = await hre.ethers.provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
  }
  async function consoleBalances(addresses) {
    let counter = 0;
    for (const address of addresses) {
      console.log(`Address ${counter} balances: `, await getBalances(address));
    }
  }
  async function consoleDonations(donations) {
    for (const donation of donations) {
      console.log(...donation);
    }
  }


async function main(){
  const [owner,from1,from2,from3]=await hre.ethers.getSigners();
  const charity=await hre.ethers.getContractFactory("charity");
  const contract=await charity.deploy("BalAnathAshram","children")
  await contract.deployed();
  console.log("contract address",contract.address);
  const addresses=[owner.address,from1.address,from2.address,from3.address];
  consoleBalances(addresses);
  const amout={value:hre.ethers.utils.parseEther("1")}
  // await contract.connect(from1).donate('rohit',"fruits",amout);
  // await contract.connect(from1).donate('mohit',"studies",amout);
  // await contract.connect(from1).donate('aman',"vegitable",amout);
consoleBalances(addresses)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
