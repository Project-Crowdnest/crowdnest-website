import React, { Component } from 'react';
import { Table, Button, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class RequestRow extends Component {
    state = {
        loadingApprove: false,
        loadingFinalize: false,
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
        const campaign = await Campaign(this.props.campaignAddress);
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
        const readyToFinalize = ((request.approvalCount * 100) / contributorsCount) >= request.approvalTolerance;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{ id }</Cell>
                <Cell>{ request.description }</Cell>
                <Cell>{ web3.utils.fromWei(request.value, 'ether') }</Cell>
                <Cell>{ request.recipient }</Cell>
                <Cell>{ request.approvalCount }/{ contributorsCount }</Cell>
                <Cell>{ request.approvalTolerance }</Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="blue" loading={this.state.loadingApprove} basic onClick={this.onApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (
                        <Button color="green" loading={this.state.loadingFinalize} basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;