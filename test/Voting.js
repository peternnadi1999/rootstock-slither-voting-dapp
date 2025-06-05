const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("Voting dApp Test", function () {
  async function deployVotingFixture() {
    const [admin, voter1, voter2] = await ethers.getSigners();
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    
    await voting.connect(admin).addCandidate("Candidate 1");
    await voting.connect(admin).addCandidate("Candidate 2");

    return { voting, admin, voter1, voter2 };
  }

  it("allows voting and tallies results", async function () {
    const { voting, voter1, voter2 } = await loadFixture(deployVotingFixture);

    await voting.connect(voter1).vote(0);
    await voting.connect(voter2).vote(1);

    expect(await voting.getResults(0)).to.equal(1);
    expect(await voting.getResults(1)).to.equal(1);
  });

  it("prevents double voting", async function () {
    const { voting, voter1 } = await loadFixture(deployVotingFixture);

    await voting.connect(voter1).vote(0);
    await expect(voting.connect(voter1).vote(1)).to.be.revertedWithCustomError(
      voting,
      "AlreadyVoted"
    );
  });
});