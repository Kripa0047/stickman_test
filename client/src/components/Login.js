import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

export class Login extends Component {
    state = {
        name: '',
        email: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onClick()
    {
        const user = {
            name: this.state.name,
            email: this.state.email
        }
        // Header
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        // Request
        const body = JSON.stringify(user);
        axios.post('/user/new',body,config)
            .then(res => {
                const userdata = {
                    user: res.data.user,
                    newU: res.data.newU
                }
                this.props.sendId(userdata);
            });
    }

    render() {
        return (
            <div>
                <div className="card text-white bg-info mb-5">
                    <div className="card-header" id="center"><h2>StickBuddies - Best Buddy Challenge</h2></div>
                    <div className="card-body">
                        <h5 className="card-title">Instructions</h5>
                        <p className="card-text">
                            <ul>
                                <li>Enter your Name</li>
                                <li>Enter your Email</li>
                                <li>Answer any 10 Questions about yourself.</li>
                                <li>Your quiz-link will be ready.</li>
                                <li>Share your quiz-link with your friends.</li>
                                <li>Your friends will try to guess the right answers.</li>
                                <li>Check the score of your friends at your quiz-link!</li>
                            </ul>
                        </p>
                        <div>
                            <Form method='POST' action='/user/new'>
                                <Col md={6}>
                                    <FormGroup className="col-md-12 offset-md-6"> 
                                        <Label>Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="Email" onChange={this.onChange} />
                                    </FormGroup>
                                    <FormGroup className="col-md-12 offset-md-6">
                                        <Label>Name</Label>
                                        <Input id="name" name="name" type="text" placeholder="Name" onChange={this.onChange} />
                                    </FormGroup>
                                </Col>
                                <FormGroup id="submitBtn">
                                    <Button onClick={this.onClick.bind(this)}>Submit</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
