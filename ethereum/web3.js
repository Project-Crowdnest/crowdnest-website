// With this file, we inject the Web3 library to the browser on 2 scenarios:
// 1.- We are in the browser and metamask is running.
// 2.- We are on the server *OR* the user is not running metamask.

import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
} else {
    // We are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        process.env.INFURA_RINKEBY_API_KEY
    )
    web3 = new Web3(provider);
}

export default web3;