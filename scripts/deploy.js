const hre = require("hardhat");

async function main() {
  const _GUSD = await hre.ethers.getContractFactory("GUSD");
  const GUSD = await _GUSD.deploy();
  await GUSD.deployed();
  console.log("GUSD deployed to:", GUSD.address);

  /// Only deploy on the testnet
  const _GATO = await hre.ethers.getContractFactory("GATOtoken");
  const GATO = await _GATO.deploy("GA*TO", "GATO");
  await GATO.deployed();
  console.log("GATO deployed to:", GATO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
