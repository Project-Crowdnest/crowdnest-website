import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class ContributeForm extends Component {

    state = {
        value: '',
    }

    onSubmit = async (event) => {
        // Prevents the browser to attempt to submit the form
        // to the backend server. We don't want this to happen since
        // we aren't working on a traditional Client-Server website.
        event.preventDefault();

        const campaign = Campaign(this.props.address);
    };

    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to contribute</label>
                    <Input
                        label="ether"
                        labelPosition="right"
                        value={this.state.value}
                        onChange={event => this.setState({ value: event.target.value })}
                    />
                </Form.Field>

                <Message error header="Error" content={this.state.errorMessage} />
                <Button primary loading={ this.state.loading }>Contribute!</Button>
            </Form>
        );
    }
}

export default ContributeForm;