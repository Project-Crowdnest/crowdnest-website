import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';


class RequestIndex extends Component {
    state = {
        description: '',
        value: '',
        recipient: '',
        approvalTolerance: '',
        loading: ''
    }


    static async getInitialProps(props) {
        return {
            // queries the address from the url
            campaignAddress: props.query.campaignAddress,
        };
    }

    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.campaignAddress);
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(
                    this.state.description,
                    web3.utils.toWei(this.state.value, 'ether'),
                    this.state.recipient,
                    this.state.approvalTolerance
                ).send({
                    from: accounts[0],
                    // gas is calculated by metamask.
                });

            Router.pushRoute(`/campaigns/${this.props.campaignAddress}/requests`);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.campaignAddress}/requests`}>
                    <a>
                        <Button
                            content='Back to Active Requests'
                            icon='arrow alternate circle left outline'
                            floated='left'
                        />
                    </a>
                </Link>
                <br />
                <h3> New request </h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Approval Tolerance</label>
                        <Input
                            value={this.state.approvalTolerance}
                            onChange={event => this.setState({ approvalTolerance: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create</Button>
                </Form>
            </Layout>

        );
    }
}

export default RequestIndex;