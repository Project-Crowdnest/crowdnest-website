import React, { Component } from 'react';
import Layout from '../../components/Layout';

class CampaignShow extends Component {
    // This function its called with a props object
    // of its own. This will not end up inside this component's
    // instance.
    static async getInitialProps(props) {
        console.log(props.query.campaignAddress);

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