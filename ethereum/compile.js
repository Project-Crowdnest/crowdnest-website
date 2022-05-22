const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// Creating a one time compile script.
// 1.- Delete entire 'build' folder.
// 2.- Read 'Campaign.sol' from the 'contracts' folder.
// 3.- Compile both contracts with solidity compiler.
// 4.- Write output to the 'build' directory

// 1.-
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath)

// 2.-
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

// 3.-
const input = {
    language: 'Solidity',
    sources: {
        'Campaign.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];
console.log(output);

// 4.-
fs.ensureDirSync(buildPath); // Checks if directory exists. Otherwise, creates it.

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract + '.json'),
        output[contract]
    );
}