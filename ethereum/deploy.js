const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    process.env.ACC_MNEMONIC,
    process.env.INFURA_RINKEBY_API_KEY
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ gas: '10000000', from: accounts[0] });

    // ALWAYS keep track of where the contract got deployed to.
    console.log('Contract deployed to', result.options.address);

    // Prevents a hanging deployment.
    provider.engine.stop();
};
deploy();