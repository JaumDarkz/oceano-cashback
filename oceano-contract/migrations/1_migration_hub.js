const DeepDiveHub = artifacts.require("DeepDiveHub");
const Sal = artifacts.require("Sal");

module.exports = function(deployer) {
    deployer.deploy(Sal).then(() => deployer.deploy(DeepDiveHub, Sal.address));
};
