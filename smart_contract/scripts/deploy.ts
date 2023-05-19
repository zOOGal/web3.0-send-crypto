import hre from 'hardhat';
import { ethers } from "hardhat";
import "@nomiclabs/hardhat-ethers";

const main = async () => {
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transactions deplyed to: ", transactions.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch(error) {
    console.error(error);
    process.exitCode = 1;
  }
}

runMain();

