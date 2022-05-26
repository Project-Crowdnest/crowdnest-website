import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
    state = {
        loadingApprove: '',
        loadingFinalize: '',
        errorMessage: ''
    }

    onApprove = async () => {
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        this.setState({ loadingApprove: true, errorMessage: ''});
        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            });
            

            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}/requests`);
        } catch (err) {

        }
        this.setState({ loadingApprove: false });
        
    }

    onFinalize = async () => {
        const campaign = Campaign(this.props.campaignAddress);
        const accounts = await web3.eth.getAccounts();
        this.setState({ loadingFinalize: true, errorMessage: ''});

        try {
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            });

            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}/requests`);
        } catch(err){

        }
        this.setState({ loadingFinalize: false });
    }

    render() {
        // Destructuring
        const { Row, Cell } = Table;
        const { id, request, contributorsCount } = this.props
        return (
            <Row>
                <Cell>{ id }</Cell>
                <Cell>{ request.description }</Cell>
                <Cell>{ web3.utils.fromWei(request.value, 'ether') }</Cell>
                <Cell>{ request.recipient }</Cell>
                <Cell>{ request.approvalCount }/{ contributorsCount }</Cell>
                <Cell>{ request.approvalTolerance }</Cell>
                <Cell><Button color="blue" loading={this.state.loadingApprove} basic onClick={this.onApprove}>Approve</Button></Cell>
                <Cell><Button color="green" loading={this.state.loadingFinalize} basic onClick={this.onFinalize}>Finalize</Button></Cell>
            </Row>
        );
    }
}

export default RequestRow;