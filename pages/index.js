import React from 'react';
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
// Link gives you the ability to 'open link in new tab'. Router does not.
import { Link } from '../routes';


class CampaignIndex extends React.Component {
    // Gets executed right before the page loads?
    static async getInitialProps() {
        // getDeployedCampaigns() returns a list of addresses of all deployed campaigns
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: 'Campaign name should go here',
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                meta: address,
                fluid: true
            };
        });
        return <Card.Group items={ items } />
    }

    render() {
        return  (
            <Layout>
                <div>
                    <h3> Open Campaigns </h3>
                    <Link route='/campaigns/new'>
                        <a>
                            <Button
                                content='Create Campaign'
                                icon='add circle'
                                primary
                                floated='right'
                             />
                        </a>
                    </Link>
                    
                    { this.renderCampaigns() }
                </div>
            </Layout>
        );
    }
}

export default CampaignIndex;