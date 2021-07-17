import React, { Component } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

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
            expirydate: startDate,
            errors: {}
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

    validateForm = event => {
        //let errors = {};
        let formIsValid = true;

        //other validation
        //such as credit card no to be 16 digits
        //ccv to be 3 digits

        var today = new Date();
        if (this.state.expirydate < today) {
            formIsValid = false;
        }
        //this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit = event => {

        event.preventDefault();

        console.log("name:" + this.state.name);
        console.log("address:" + this.state.address);
        console.log("creditcard:" + this.state.creditcard);
        console.log("ccv:" + this.state.ccv);
        console.log("expirydate:" + this.state.expirydate);

        if (this.validateForm()) {
            alert("Form submitted");

            axios.post('http://localhost/testapi/user/register',
                {
                    name: this.state.name,
                    address: this.state.address,
                    creditcard: this.state.creditcard,
                    ccv: this.state.ccv,
                    expirydate: this.state.expirydate
                },
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                    }
                })
                .then(function (response) {
                    if (response.status === 200) {
                        if (response.data === "Success") {
                            alert("Saved successfully!");
                            window.location.href = '/home';
                        }
                        else {
                            alert(response.data);
                        }

                    }
                })
                .catch(function (error) {
                    console.log(error);
                });

        }
        else {
            alert("Form has errors.")
        }
    }

    static displayName = Registration.name;

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Name" value={this.state.name}
                        onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value={this.state.address}
                        onChange={this.handleChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="creditcard">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Credit Card Number" value={this.state.creditcard}
                        onChange={this.handleChange} required type="number"/>
                </Form.Group>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="ccv">
                        <Form.Label>CCV</Form.Label>
                        <Form.Control type="text" placeholder="Enter CCV" value={this.state.ccv}
                            onChange={this.handleChange} required type="number"/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="expirydate">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Group>
                        <DatePicker dateFormat="dd-MM-yyyy"
                            selected={this.state.expirydate}
                                onChange={this.handleDateChange}
                                placeholder="Enter Expiry Date" required></DatePicker>
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
