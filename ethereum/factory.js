// This file houses the factory contract that is already deployed
// to the Rinkeby network. With it, we get immediate access
// to that deployed contract.

import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const CAMPAIGN_FACTORY_ADDRESS='0x3e48F534d3402d729A938b46Fa0C8e608fAAa779';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    CAMPAIGN_FACTORY_ADDRESS
);

// This exports a local copy of the REAL deployed contract, which serves as a portal for React to interact with the contract.
export default instance;