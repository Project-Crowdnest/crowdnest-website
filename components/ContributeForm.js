import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        successMessage: '',
        loading: false,
        minEtherContribution: web3.utils.fromWei(this.props.minContribution, 'ether')
    }

    onSubmit = async (event) => {
        // Prevents the browser to attempt to submit the form
        // to the backend server. We don't want this to happen since
        // we aren't working on a traditional Client-Server website.
        event.preventDefault();

        // This Campaign is NOT a constructor. Is the campaign contract exported by
        // campaign.js.
        // Matches the :campaignAddress wildcard in routes.js
        const campaign = Campaign(this.props.campaignAddress);

        this.setState({ loading: true, errorMessage:'' });
        
        try {
            const accounts = await web3.eth.getAccounts();
            const contributionAmount = web3.utils.toWei(this.state.value, 'ether')
            await campaign.methods
                .contribute()
                .send({
                    from: accounts[0],
                    value: contributionAmount
                })
            
            this.setState({ successMessage: 'Contribution recorded succesfully!' });
            this.setState({ errorMessage: '' });

            // This REFRESHES the page to the campaign page after successfully creating one.
            // If pushRoute was used, the page is added to the browser's entry history,
            // causing the 'back' button to show the same page twice. For this reason,
            // replaceRoute is used instead.
            Router.replaceRoute(`/campaigns/${this.props.campaignAddress}`);

        } catch (err) {
            this.setState({ errorMessage: err.message });
            this.setState({ successMessage: '' });
        }
        this.setState({ loading: false, value: '' });
    };

    onClick = (event) => {
        this.setState({value: this.state.minEtherContribution});
        this.setState({ successMessage: '' });
        this.setState({ errorMessage: ''});
    }

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ETH"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                    <Button 
                        onClick={this.onClick} 
                        style={{ marginTop: '5px' }} 
                        basic color='green' 
                        content={this.state.minEtherContribution}
                        type='button'
                    />
                </Form.Field>
                
                <Message success header="Thank you!" content={this.state.successMessage} />
                <Message error header="Error" content={this.state.errorMessage} />
                <Button primary loading={ this.state.loading }>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;