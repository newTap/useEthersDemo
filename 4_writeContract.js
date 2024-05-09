import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/bf80bb39862742179a4d6e082c837872`);

// 可写可以向合约写入信息以及执行交易。参数分别是合约abi和signer(wallet对象)
// const contract = new ethers.Contract(`address`, `abi`, `signer`);
// 可读合约不需要消耗gas，而可写合约需要消耗gas
// 发送交易
// METHOD_NAME为合约中的方法名，args为函数参数，[, overrides]是可以选择传入的数据包括如下：
// gasPrice：gas价格
// gasLimit：gas上限
// value：调用时传入的ether（单位是wei）
// nonce：nonce
//! 此方法不能获取合约运行的返回值，如有需要，要使用Solidity事件记录，然后利用交易收据去查询。
// const tx = await contract.METHOD_NAME(args [, overrides])
// 等待链上确认交易
// await tx.wait()

const privateKey = '0x8091aa1310010cf8cc3b1c0433fefed87909c88d203101310789d17c1ab2de65'
// 创建wallet对象
const wallet = new ethers.Wallet(privateKey, provider)


// 与测试网WETH合约交互

// WETH的ABI
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function transfer(address, uint) public returns (bool)",
    "function withdraw(uint) public",
];
// WETH合约地址（sepolia测试网）
const addressWETH = '0x5f207d42F869fd1c71d7f0f81a2A67Fc20FF7323' // WETH Contract

// 声明可写合约
const contractWETH = new ethers.Contract(addressWETH, abiWETH, wallet)

const address = await wallet.getAddress()

const balance = await provider.getBalance(address)
console.log('balance', balance)

// 发起交易
const tx = await contractWETH.deposit({value: ethers.parseEther("0.001")})
// 等待交易上链
await tx.wait()
console.log(`交易详情：`)
console.log(tx)

// 查看WETH的持仓
const balanceWETH_deposit = await contractWETH.balanceOf(address)
console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit)}\n`)

// 提取WETH
const tx2 = await contractWETH.withdraw(ethers.parseEther("0.005"))
// 等待交易上链
await tx2.wait()
console.log('提取信息:')
console.log(tx2)

// 查看WETH的持仓
const balanceWETH_deposit2 = await contractWETH.balanceOf(address)
console.log(`存款后WETH持仓: ${ethers.formatEther(balanceWETH_deposit2)}\n`)