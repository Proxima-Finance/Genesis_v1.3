const fs = require("fs");
const ProximaVault = artifacts.require("ProximaVault");
const ProximaToken = artifacts.require("ProximaToken");

module.exports = async function (deployer, _network, addresses) {
  const [admin, reporter, _] = addresses;

  await deployer.deploy(ProximaVault);
  const proximaVault = await ProximaVault.deployed();
  await deployer.deploy(ProximaToken, proximaVault.address);
  const proximaToken = await ProximaToken.deployed();
  await proximaVault.initVault(proximaToken.address);

  console.log("proximaToken", proximaToken.address);
  console.log("proximaVault", proximaVault.address);

  var deploymentDic = {
    deployer: admin,
    proximaToken: proximaToken.address,
    proximaVault: proximaVault.address,
  };

  var deploymentDicString = JSON.stringify(deploymentDic);
  fs.writeFile(
    "proximaDeployment.json",
    deploymentDicString,
    function (err, result) {
      if (err) console.log("error", err);
    }
  );
};
