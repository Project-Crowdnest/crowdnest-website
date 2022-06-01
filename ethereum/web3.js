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
        'https://rinkeby.infura.io/v3/21ac8d387edf4a9f90961f26ecb22416'
    )
    web3 = new Web3(provider);
}

export default web3;