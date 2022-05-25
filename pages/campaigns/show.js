import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

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
                header: 'Balance',
                meta: balance,
                description: '',
            },
            {
                header: 'Minimum Contribution',
                meta: web3.utils.fromWei(minimumContribution, 'ether') + ' ether',
                description: ''
            },
            {
                header: 'Requests',
                meta: requestsNum,
                description: ''
            },
            {
                header: 'Contributors',
                meta: contributorsCount,
                description: ''
            },
            {
                header: 'Manager',
                meta: manager,
                description: 'The manager created this campaign and can create requests to withdraw money'
            },
        ];
        
        return <Card.Group items={ items } />
    }

    render () {
        return (
            <Layout>
                <h3> { this.props.campaignName } </h3>
                { this.renderSummary() }
            </Layout>
        )
    }
}

export default CampaignShow;