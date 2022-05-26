import React from 'react';
import factory from '../../ethereum/factory';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';
// This router is mostly used for redirects rather than manual routing.
import { Router } from '../../routes';


class CampaignNew extends React.Component {
    state = {
        campaignName: '',
        minimumContribution: '',
        errorMessage: '',
        loading: false
    }

    onSubmit = async (event) => {
        // Prevents the browser to attempt to submit the form
        // to the backend server. We don't want this to happen since
        // we aren't working on a traditional Client-Server website.
        event.preventDefault();
        this.setState({ loading: true, errorMessage:'' });
        
        try {
            const accounts = await web3.eth.getAccounts();
            const weiMinContribution = web3.utils.toWei(this.state.minimumContribution, 'ether')
            await factory.methods
                .createCampaign(weiMinContribution, this.state.campaignName)
                .send({
                    from: accounts[0]
                    //gas: is automatically calculated by Metamask. 
                });
            
            
            // BIG INVESTIGATION: How to redirect to the campaign that was just created.
            // Need to refactor the Campaign.sol contract to allow campaign IDentifier. 
            // - Problem: What happens if multiple people try to create campaigns at the same time? 
            // Who gets to update the campaign ID?
            // Race conditions? 

            // Redirect user to the home page after successfully creating a campaign.
            Router.pushRoute(`/`)

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Campaign name</label>
                        <Input
                            value={this.state.campaignName}
                            onChange={event => this.setState({ campaignName: event.target.value })}
                        />
                        <label>Minimum contribution</label>
                        <Input
                            label='ETH'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Launch Campaign</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;