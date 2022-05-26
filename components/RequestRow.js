import React, { Component } from 'react';
import { Tab, Table } from 'semantic-ui-react';
import web3 from '../ethereum/web3';

class RequestRow extends Component {
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
                <Cell>{ true }</Cell>
                <Cell>{ false }</Cell>
            </Row>
        );
    }
}

export default RequestRow;