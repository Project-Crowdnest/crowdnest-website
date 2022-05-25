import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button } from 'semantic-ui-react';
import { Link } from '../../../routes';


class RequestIndex extends Component {
    static async getInitialProps(props) {
        return { 
            campaignAddress: props.query.campaignAddress,
        };
    }
    render() {
        return (
            <Layout>
                <Link route={ `/campaigns/${this.props.campaignAddress}/requests` }>
                        <a>
                            <Button
                                content='Back to Active Requests'
                                icon='arrow alternate circle left outline'
                                floated='left'
                             />
                        </a>
                </Link>
                <br />
                <h3> Adding request </h3>
            </Layout>
            
        );
    }
}

export default RequestIndex;