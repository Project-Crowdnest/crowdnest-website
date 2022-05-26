import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Tab, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

class RequestIndex extends Component {

    static async getInitialProps(props) {
        const campaign = Campaign(props.query.campaignAddress);
        const requestsCount = await campaign.methods.getRequestsCount().call();
        const contributorsCount = await campaign.methods.contributorsCount().call();

        // Fancy javascript
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index) => {
                    return campaign.methods.requests(index).call();
                })
        );

        return { 
            // queries the address from the url
            campaignAddress: props.query.campaignAddress,
            campaignRequests: requests,
            contributorsCount: contributorsCount
        };
    }

    renderRow() {
        return this.props.campaignRequests.map((request, index) => {
            return (
                <RequestRow 
                    key={index}
                    id={index}
                    request={request}
                    campaignAddress={this.props.campaignAddress}
                    contributorsCount={this.props.contributorsCount}
                />
            )
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
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
                        <Button primary>New Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (ETH)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approval Tolerance</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>

                    <Body>
                    { this.renderRow() }
                    </Body>
                </Table>
            </Layout>
        );
    }
}

export default RequestIndex;