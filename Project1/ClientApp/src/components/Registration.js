import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

export class Registration extends Component {
    constructor(props) {

        super(props);

        const startDate = new Date();


        this.state =
        {
            name: "",
            address: "",
            creditcard: "",
            ccv: "",
            expirydate: startDate
        };

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(date) {
        this.setState({ expirydate: Date.parse(moment(date, 'dd/MM/yyyy').toISOString()) });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.address.length > 0;
    }

    handleSubmit(event) {
       event.preventDefault();
    }

    static displayName = Registration.name;

    render() {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={this.state.name}
                        onChange={this.handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value={this.state.address}
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="creditcard">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Credit Card Number" value={this.state.creditcard}
                        onChange={this.handleChange} />
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="ccv">
                        <Form.Label>CCV</Form.Label>
                        <Form.Control type="text" placeholder="Enter CCV" value={this.state.ccv}
                            onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group as={Col} controlId="expirydate">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Group>
                        <DatePicker dateFormat="dd-MM-yyyy"
                            selected={this.state.expirydate}
                                onChange={this.handleDateChange} placeholder="Enter Expiry Date"></DatePicker>
                            </Form.Group>
                    </Form.Group>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>
        );
    }
}
