import { ethers } from "ethers";
//! ethers内置的rpc访问速度有限制，仅测试用，生产环境还是要申请个人rpc
// Provider类是一个为以太坊网络连接提供抽象的类,它提供对区块链及其状态的只读访问
// ethers内置了一些公用rpc
// const provider = ethers.getDefaultProvider();

// !Provider不接触用户私钥，只能读取链上信息，不能写入
// 链接特定的网络节点
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth");

const main = async () => {
  // !ENS（Ethereum Name Service）是以太坊域名服务，是一个基于以太坊区块链的分布式、开放和可扩展的命名系统。
  // ethers原生支持ENS域名，我们不需要知道具体地址，用ENS域名vitalik.eth就可以查询到以太坊创始人vitalik的余额
  // !但是不同网络对ENS域名的支持不同，最好使用具体的钱包地址
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
    // 获取当前链接的网络
    const netWork = await provider.getNetwork()
    console.log(netWork.toJSON());
    // 获取当前高度
    const blockHeight = await provider.getBlockNumber()
    console.log(blockHeight)
    // 获取钱包的交易次数
    const count = await provider.getTransactionCount("vitalik.eth")
    console.log(count)
    // 查询当前gas的设置
    const feeData = await provider.getFeeData()
    console.log(feeData)
    // 查询指定高数的区块信息
    const blockData = await provider.getBlock(1)
    console.log(blockData)
    // 查询指定合约的bytecode信息
    const code = await provider.getCode("0xc778417e063141139fce010982780140aa0cd5ab")
    console.log(code)
}

main()