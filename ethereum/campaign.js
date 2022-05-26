// This file houses the campaign contract that is already deployed
// to the Rinkeby network. With it, we get immediate access
// to that deployed contract.

import web3 from './web3';
import Campaign from './build/Campaign.json';


// This exports a local copy of the REAL deployed campaing contract, 
// which serves as a portal for React to interact with the contract.
// This looks different from factory.js because we don't know the 
// Campaign address beforehand. So we need to call this import with a parameter.
export default async (address) => {
    const contractInstance = await new web3.eth.Contract(
        Campaign.abi,
        address
    ); 
    
    return contractInstance;
};


