import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/bf80bb39862742179a4d6e082c837872`);

// contract对象分为两类，一类是只读，一类是可写。
// 只读只能读取合约上的信息，即调用合约的"view"与"pure"函数。参数分别是合约地址，合约abi和provider变量（只读）。
// const contract = new ethers.Contract(`address`, `abi`, `provider`);
// 可写可以向合约写入信息以及执行交易。参数分别是合约abi和signer变量
// const contract = new ethers.Contract(`address`, `abi`, `signer`);

const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
];
const addressDAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F' // DAI Contract
// 只读合约信息
const contractWETH = new ethers.Contract(addressDAI, abiERC20, provider)

// 可写合约信息
// Signer签名者类是以太坊账户的抽象，可用于对消息和交易进行签名，并将签名的交易发送到以太坊网络，并更改区块链状态。
// Signer类是抽象类，不能直接实例化，我们需要使用它的子类：Wallet钱包类。

const main = async () => {
    // 1. 读取WETH合约的链上信息（WETH abi）
    const nameWETH = await contractWETH.name()
    const symbolWETH = await contractWETH.symbol()
    const totalSupplyWETH = await contractWETH.totalSupply()
    console.log("\n1. 读取WETH合约信息")
    console.log(`合约地址: ${addressDAI}`)
    console.log(`名称: ${nameWETH}`)
    console.log(`代号: ${symbolWETH}`)
    console.log(`总供给: ${ethers.formatEther(totalSupplyWETH)}`)
    const balanceWETH = await contractWETH.balanceOf('vitalik.eth')
    console.log(`Vitalik持仓: ${ethers.formatEther(balanceWETH)}\n`)
}

main()