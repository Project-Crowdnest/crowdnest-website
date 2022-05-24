import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

class CampaignShow extends Component {
    // This function its called with a props object
    // of its own. This will not end up inside this component's
    // instance. With it we can get used of the wildcard we defined
    // in ./routes.js
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.campaignAddress);

        const summary = await campaign.methods.getCampaignSummary().call();
        console.log(summary);
        return {};
    }

    render () {
        return (
            <Layout>
                <h3> Campaign Show !</h3>

            </Layout>
        )
    }
}

export default CampaignShow;