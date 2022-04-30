const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("GUSD Stable Coin Test", function () {
  let GUSD;
  let owner, wallet;
  beforeEach(async () => {
    [owner, wallet] = await ethers.getSigners();
    const _GUSD = await ethers.getContractFactory("GUSD");
    GUSD = await _GUSD.deploy();
  });

  it("param setting", async function () {
    expect(await GUSD.name()).to.eq("Gato USDT");
    expect(await GUSD.symbol()).to.eq("GUSD");
    expect(await GUSD.decimals()).to.eq(6);
  });

  it("mint", async function() {
    const mintAmount = BigNumber.from(334532543);
    const totalSupply = await GUSD.totalSupply();
    const balance = await GUSD.balanceOf(owner.address);
    await GUSD.mint(mintAmount);
    expect(await GUSD.totalSupply()).to.eq(mintAmount.add(totalSupply));
    expect(await GUSD.balanceOf(owner.address)).to.eq(mintAmount.add(balance));
  })

  it("burn", async() => {
    const burnAmount = BigNumber.from(43543252);
    const totalSupply = await GUSD.totalSupply();
    const balance = await GUSD.balanceOf(owner.address);
    await GUSD.burn(burnAmount);
    expect(await GUSD.balanceOf(owner.address)).to.eq(balance.sub(burnAmount));
    expect(await GUSD.totalSupply()).to.eq(totalSupply.sub(burnAmount));
  })

  it("transfer", async() => {
    const transferAmount = BigNumber.from(43214324);
    const balanceA = await GUSD.balanceOf(owner.address);
    const balanceB = await GUSD.balanceOf(wallet.address);
    await GUSD.transfer(wallet.address, transferAmount);
    expect(await GUSD.balanceOf(owner.address)).to.eq(balanceA.sub(transferAmount));
    expect(await GUSD.balanceOf(wallet.address)).to.eq(balanceB.add(transferAmount));
  })

  it("approve", async() => {
    const approveAmount = BigNumber.from(43124321543);
    const balance = await GUSD.balanceOf(owner.address);
    const allowance = await GUSD.allowance(owner.address, wallet.address);

    await GUSD.approve(wallet.address, approveAmount);
    expect(await GUSD.allowance(owner.address, wallet.address)).to.eq(allowance.add(approveAmount));
  })

  it("transferFrom", async() => {
    const approveAmount = BigNumber.from(43124321543);
    const transferAmount = BigNumber.from(432432);
    const balanceA = await GUSD.balanceOf(owner.address);
    const balanceB = await GUSD.balanceOf(wallet.address);
    await GUSD.approve(wallet.address, approveAmount);
    const allowance = await GUSD.allowance(owner.address, wallet.address);
    await GUSD.connect(wallet).transferFrom(owner.address, wallet.address, transferAmount);

    expect(await GUSD.allowance(owner.address, wallet.address)).to.eq(allowance.sub(transferAmount));
    expect(await GUSD.balanceOf(owner.address)).to.eq(balanceA.sub(transferAmount));
    expect(await GUSD.balanceOf(wallet.address)).to.eq(balanceB.add(transferAmount));
  })

  it("increase & decrease allowance", async() => {
    const increaseAllowance = BigNumber.from(4784298723);
    const decreaseAllowance = BigNumber.from(42143282);
    await GUSD.approve(wallet.address, 543739342);
    const allowance = await GUSD.allowance(owner.address, wallet.address);
    await GUSD.increaseAllowance(wallet.address, increaseAllowance);
    const increasedAllowance = await GUSD.allowance(owner.address, wallet.address);
    expect(increasedAllowance).to.eq(allowance.add(increaseAllowance));
    await GUSD.decreaseAllowance(wallet.address, decreaseAllowance);
    const decreasedAllowance = await GUSD.allowance(owner.address, wallet.address);
    expect(decreasedAllowance).to.eq(increasedAllowance.sub(decreaseAllowance));
  });
});
