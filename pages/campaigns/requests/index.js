import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';


class RequestIndex extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.campaignAddress);
        const requestsCount = await campaign.methods.getRequestsCount().call();

        // Fancy javascript
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        console.log(requests);


        return { 
            // queries the address from the url
            campaignAddress: props.query.campaignAddress,
        };
    }
    render() {
        return (
            <Layout>
                <Link route={ `/campaigns/${this.props.campaignAddress}` }>
                        <a>
                            <Button
                                content='Back to Campaign'
                                icon='arrow alternate circle left outline'
                                floated='left'
                             />
                        </a>
                </Link>
                <br />
                <h3>Pending requests</h3>
                <Link route={ `/campaigns/${this.props.campaignAddress}/requests/new` }>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        );
    }
}

export default RequestIndex;