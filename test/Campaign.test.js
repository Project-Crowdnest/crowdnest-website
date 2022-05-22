const assert = require("assert");
const ganache = require("ganache-cli");
const options = { gasLimit: 100000000 };
const Web3 = require("web3");
const web3 = new Web3(ganache.provider(options));

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await web3.eth.getAccounts();
    // Factory deploys a contract to the local ganache blockchain.
    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: '10000000' });

    // Campaign gets created.
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // Bring the address of the first (and only) created campaign.
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    // Javascript representation of the contract that exist in campaignAddress and was
    // previously deployed by compiledFactory.
    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    );

});

describe("Campaigns", () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    // Sender is the person who called createCampaign on the CampaignFactory.
    it('marks sender as the campaign manager', async() => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('allows contribution', async() => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        const senderIsContributor = await campaign.methods.contributors(accounts[1]).call();
        assert(senderIsContributor);
    });

    it('contributorsCount increases when contributed', async() => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: '200'
        });

        await campaign.methods.contribute().send({
            from: accounts[2],
            value: '200'
        });

        const contributorsCount = await campaign.methods.contributorsCount().call();
        assert.equal(2, contributorsCount);
    });

    it("requires a minimum contribution", async() => {
        try {
            await campaign.methods.contribute().send({
                from: accounts[1],
                value: 99,
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('allows manager to create payment request', async() => {
        await campaign.methods.createRequest('Buy something', '100', accounts[2], '55').send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy something', request.description);
    });

    it('denies create request if not manager', async() => {
        try {
            await campaign.methods.createRequest('Buy something', '100', accounts[2], '55').send({
                from: accounts[1],
                gas: '1000000'
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    });

    it('denies approval if approval tolerance is not met', async() => {
        // 3 contributors
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: 200
        });
        await campaign.methods.contribute().send({
            from: accounts[2],
            value: 200
        });
        await campaign.methods.contribute().send({
            from: accounts[3],
            value: 200
        });

        // Create request with 85 tolerance.
        await campaign.methods.createRequest('Buy something', '100', accounts[4], '85').send({
            from: accounts[0],
            gas: 1000000
        });

        // Only 1 approves
        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: 1000000
        });

        // Request fails to complete.
        try {
            await campaign.methods.finalizeRequest(0).send({
                from: accounts[0],
                gas: 1000000
            });
            assert(false);
        } catch (err) {
            assert(err);
        }

    });

    it('end to end test', async() => {
        // Contribute from acc[1]
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: web3.utils.toWei('10', 'ether')
        });

        // Manager (acc[0]) creates request
        await campaign.methods
            .createRequest('Buy something', web3.utils.toWei('5', 'ether'), accounts[2], '55')
            .send({ from: accounts[0], gas: '1000000' });

        // acc[1] approves request
        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: '1000000'
        });

        let recipientInitialBalance = await web3.eth.getBalance(accounts[2]);
        recipientInitialBalance = web3.utils.fromWei(recipientInitialBalance, 'ether');
        recipientInitialBalance = parseFloat(recipientInitialBalance);
        // Manager (acc[0]) finalizes request
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });
        let recipientFinalBalance = await web3.eth.getBalance(accounts[2]);
        recipientFinalBalance = web3.utils.fromWei(recipientFinalBalance, 'ether');
        recipientFinalBalance = parseFloat(recipientFinalBalance);

        const difference = recipientFinalBalance - recipientInitialBalance;
        assert(difference == 5.0);
    });
});