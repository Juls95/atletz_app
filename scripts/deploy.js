const { ethers } = require("hardhat");

async function main() {
  const args = {
    gasPrice: '0xB2D05E00', // 3 Gwei
  };

  const owner = '0x...'; //Address of the owner of the contract (UP)

  console.log('deploying AtletezNFTs...');
  const AtletezNFTs = await ethers.getContractFactory('AtletezNFTs');
  const atletezNFTs = await AtletezNFTs.deploy(owner, args);
  await atletezNFTs.deployed();
  console.log('AtletezNFTs deployed to:', atletezNFTs.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
