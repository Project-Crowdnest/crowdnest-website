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
        const campaignNames = await factory.methods.getCampaignNames().call();
        
        const zippedCampaignArrays = campaigns.map(function(e, i) {
            return [e, campaignNames[i]];
        });
        // [[campaignAddress1, campaignName1],
        //  [campaignAddress2, campaignName2],
        //  [campaignAddress3, campaignName3],
        //  ...]
        return {zippedCampaignArrays};
    }

    renderCampaigns() {
        const z = this.props.zippedCampaignArrays;
        let items = [];
        for (let i=0; i<z.length; i++) {
            let campaignName = z[i][1];
            let campaignAddress = z[i][0];
            items.push({
                // Campaign Name
                header: campaignName,
                // Campaign Address
                meta: campaignAddress,
                description: (
                    <Link route={`/campaigns/${campaignAddress}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true,
            });
        }
        return <Card.Group items={ items } />
    }

    render() {
        return  (
            <Layout>
                <br/>
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