import React, { Component } from 'react';
import { Card, Grid, Button} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    // This function its called with a props object
    // of its own. This will not end up inside this component's
    // instance. With it we can make use of the wildcard we defined
    // in ./routes.js
    static async getInitialProps(props) {
        // This Campaign is NOT a constructor. Is the campaign contract exported by
        // campaign.js, which a replica of the campaign that exists in the blockchain.
        // Matches the :campaignAddress wildcard in routes.js
        const { campaignAddress } = props.query;
        const campaign = await Campaign(campaignAddress);

        const summary = await campaign.methods.getCampaignSummary().call();
        return { 
            campaignAddress: campaignAddress,
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
                header: web3.utils.fromWei(minimumContribution, 'ether') + ' ETH',
                meta: 'Minimum contribution',
                description: 'You must contribute at least this much ether to become a contributor.'
            },
            {
                header: contributorsCount,
                meta: 'Contributors',
                description: 'Number of people that have contributed to the campaign.'
            },
            {
                header: web3.utils.fromWei(balance, 'ether') + ' ETH',
                meta: 'Balance',
                description: 'The balance is how much money this campaign has left to spend.',
            },
            {
                header: requestsNum,
                meta: 'Pending requests',
                description: 'Requests must be approved by contributors. The manager is able to finalize a request if the approval tolerance is met.'
            },
        ];
        
        return <Card.Group items={ items } />
    }

    render () {
        return (
            <Layout>
                <Link route='/'>
                        <a>
                            <Button
                                content='Back to Open Campaigns'
                                icon='arrow alternate circle left outline'
                                floated='left'
                             />
                        </a>
                </Link>
                <br />
                <h3> { this.props.campaignName } </h3>
                <h4> Campaign address: { this.props.campaignAddress }</h4>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            { this.renderSummary() }
                        </Grid.Column>
                        
                        <Grid.Column width={6}>
                            <ContributeForm campaignAddress={ this.props.campaignAddress } minContribution={ this.props.minimumContribution }/>
                        </Grid.Column>
                    </Grid.Row>
                        
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                                <a>
                                    <Button primary>View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;