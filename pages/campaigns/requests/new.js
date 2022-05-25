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
    }

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
                <Form>
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

                    <Button primary>
                        Create
                    </Button>
                </Form>
            </Layout>
            
        );
    }
}

export default RequestIndex;