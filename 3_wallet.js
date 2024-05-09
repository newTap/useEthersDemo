
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/bf80bb39862742179a4d6e082c837872`);
// Wallet类继承了Signer类，并且开发者可以像包含私钥的外部拥有帐户（EOA）一样，用它对交易和消息进行签名。

async function main (){
  // 使用此方法创建的钱包将具有助记词。
  // !返回一个带有随机私钥的新钱包，由加密安全的熵源生成。如果当前环境没有安全的熵源，则会抛出错误。
  // const createWallet = ethers.Wallet.createRandom()
  // console.log('wallet1', createWallet)

  // const privateKey = createWallet.privateKey
  // 当知道对应的私钥之后则可以连接对应的钱包
  const privateKey = '0x8091aa1310010cf8cc3b1c0433fefed87909c88d203101310789d17c1ab2de65'
  //! 通过Wallet链接钱包返回的是一个普通wallet对象
  const wallet1 = new ethers.Wallet(privateKey, provider)
  console.log('wallet1', wallet1)
  console.log('钱包地址',await wallet1.getAddress())

  // 当知道对应的助记词则也可以链接对应的钱包
  // const phrase = createWallet.phrase
  const phrase = 'chef reunion duty wool honey similar culture rebuild caution bronze sea scare'
  //! 通过助记词链接钱包返回的是一个HDWallet对象
  // HD钱包，是一个层次结构确定性钱包，是一种使用种子短语生成主私钥的加密货币钱包。然后可以使用此主私钥派生大量子私钥，每个子私钥对应一个不同的钱包地址
  const wallet2 = ethers.Wallet.fromPhrase(phrase, provider)
  console.log('地址', await wallet2.getAddress())
  console.log('私钥', wallet2.privateKey)
  console.log('助记词', wallet2.mnemonic.phrase)
  console.log('钱包交互次数', await provider.getTransactionCount(wallet2))
  // 发送ETH
  // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
    const tx = {
      // 接受TTH的账号
      to: wallet1,
      value: ethers.parseEther("0.0001")
    }
    // chainlink水龙头: https://faucets.chain.link/goerli
    // paradigm水龙头: https://faucet.paradigm.xyz/
    // 发送交易，获得收据
    console.log(` 等待交易在区块链确认（需要几分钟）`)
    const receipt = await wallet2.sendTransaction(tx)
    await receipt.wait() // 等待链上确认交易
    console.log(receipt) // 打印交易详情
}
main()