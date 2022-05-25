import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';


class RequestIndex extends Component {

    static async getInitialProps(props) {
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
                <h3>Active requests</h3>
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