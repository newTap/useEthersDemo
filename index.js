import { ethers } from "ethers";
// Provider类是一个为以太坊网络连接提供抽象的类,它提供对区块链及其状态的只读访问
// ethers内置了一些公用rpc
//! ethers内置的rpc访问速度有限制，仅测试用，生产环境还是要申请个人rpc
const provider = ethers.getDefaultProvider();

const main = async () => {
  // !ENS（Ethereum Name Service）是以太坊域名服务，是一个基于以太坊区块链的分布式、开放和可扩展的命名系统。
  // ethers原生支持ENS域名，我们不需要知道具体地址，用ENS域名vitalik.eth就可以查询到以太坊创始人vitalik的余额
    const balance = await provider.getBalance(`vitalik.eth`);
    console.log(`ETH Balance of vitalik: ${ethers.formatEther(balance)} ETH`);
}

main()