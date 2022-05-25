import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends Component {
    // This function its called with a props object
    // of its own. This will not end up inside this component's
    // instance. With it we can make use of the wildcard we defined
    // in ./routes.js
    static async getInitialProps(props) {
        // This Campaign is NOT a constructor. Is the campaign contract exported by
        // campaign.js.
        // Matches the :campaignAddress wildcard in routes.js
        const campaign = Campaign(props.query.campaignAddress);

        const summary = await campaign.methods.getCampaignSummary().call();
        return { 
            campaignName: summary[0],
            balance: summary[1],
            minimumContribution: summary[2],
            requestsNum: summary[3],
            contributorsCount: summary[4],
            manager: summary[5]
        };
    }

    renderSummary() {
        const {
            balance,
            minimumContribution,
            requestsNum,
            contributorsCount,
            manager
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Manager',
                description: 'This address created this campaign and is able to create requests to transfer money.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(minimumContribution, 'ether') + ' ether',
                meta: 'Minimum contribution',
                description: 'You must contribute at least this much ether to become a contributor.'
            },
            {
                header: requestsNum,
                meta: 'Active requests',
                description: 'Requests must be approved by contributors. The manager is able to finalize a request if the approval tolerance is met.'
            },
            {
                header: contributorsCount,
                meta: 'Contributors',
                description: 'Number of people that have contributed to the campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether') + ' ether',
                meta: 'Balance',
                description: 'The balance is how much money this campaign has left to spend.',
            },
        
            
        ];
        
        return <Card.Group items={ items } />
    }

    render () {
        return (
            <Layout>
                <h3> { this.props.campaignName } </h3>
                
                { this.renderSummary() }
                <ContributeForm />
                
            </Layout>
        )
    }
}

export default CampaignShow;