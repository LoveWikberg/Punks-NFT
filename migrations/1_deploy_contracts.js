var MintPunks = artifacts.require("./MintPunks.sol");

module.exports = function(deployer) {
  deployer.deploy(MintPunks);
};
