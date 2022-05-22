// This file houses the factory contract that is already deployed
// to the Rinkeby network. With it, we get immediate access
// to that deployed contract.

import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    process.env.CAMPAIGN_FACTORY_ADDRESS
);

// This exports a local copy of the REAL deployed contract, which serves as a portal for React to interact with the contract.
export default instance;