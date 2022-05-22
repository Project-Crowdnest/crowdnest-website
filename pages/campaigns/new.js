import React from 'react';
import factory from '../../ethereum/factory';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../ethereum/web3';

class CampaignNew extends React.Component {
    state = {
        minimumContribution: '',
        errorMessage: ''
    }

    onSubmit = async (event) => {
        // Prevents the browser to attempt to submit the form
        // to the backend server. We don't want this to happen since
        // we aren't working on a traditional Client-Server website.
        event.preventDefault();
        
        try {
            const accounts = await web3.eth.getAccounts();
            const weiContribution = web3.utils.toWei(this.state.minimumContribution, 'ether')
            await factory.methods
                .createCampaign(weiContribution)
                .send({ from: accounts[0] });
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign!</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input
                            label='ether'
                            labelPosition='right'
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Error" content={this.state.errorMessage} />
                    <Button primary>Launch Campaign</Button>
                </Form>


            </Layout>

        );
    }
}

export default CampaignNew;