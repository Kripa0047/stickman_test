import React, { Component } from 'react';
import { Form } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

export class GetQuizAns extends Component {
    constructor(props) {
        super(props);
        const curUser = props.curUser;
        const friendsUser = props.friendsuser;
        if(curUser)
        {
            this.state = {
                curUser: curUser,
                friendsUser: friendsUser,
                Style: { background: 'linear-gradient(#FF5F6D, #FFC371)' },
                user: curUser.username,
                index: 0,
                questionOptions: [],
                answerOptions: [],
                answers: []
            }
        }
        else
        {
            this.state = {
                curUser: curUser,
                friendsUser: friendsUser,
                Style: { background: 'linear-gradient(#FF5F6D, #FFC371)' },
                user: '',
                index: 0,
                questionOptions: [],
                answerOptions: [],
                answers: []
            }
        }
    }
    componentWillMount() {

        axios.get(`/invite/form/${this.props.uid}/${this.props.fid}`)
            .then(res => {
                if(res.data.msg_id === 0)
                    this.props.history.push('/');
                else if(res.data.msg_id === 1)
                    {
                        const data = {
                            user: res.data.user,
                            msg_id: 1
                        }
                        this.props.sendId(data);
                    }
                else if (res.data.msg_id === 2)
                {
                    var invresult = res.data.iid;
                    this.props.history.push(`/invite/results/${this.props.uid}/${this.props.fid}/${invresult._id}`);   
                }
                else
                {
                    let questionOptions =
                    [
                        { ques: res.data.friend.qa[0].ques, id: 1 },
                        { ques: res.data.friend.qa[1].ques, id: 2 },
                        { ques: res.data.friend.qa[2].ques, id: 3 },
                        { ques: res.data.friend.qa[3].ques, id: 4 },
                        { ques: res.data.friend.qa[4].ques, id: 5 },
                        { ques: res.data.friend.qa[5].ques, id: 6 },
                        { ques: res.data.friend.qa[6].ques, id: 7 },
                        { ques: res.data.friend.qa[7].ques, id: 8 },
                        { ques: res.data.friend.qa[8].ques, id: 9 },
                        { ques: res.data.friend.qa[9].ques, id: 10 }
                    ];
        
                let answerOptions =
                    [
                        { id: 1, options: res.data.friend.qa[0].options },
                        { id: 2, options: res.data.friend.qa[1].options },
                        { id: 3, options: res.data.friend.qa[2].options },
                        { id: 4, options: res.data.friend.qa[3].options },
                        { id: 5, options: res.data.friend.qa[4].options },
                        { id: 6, options: res.data.friend.qa[5].options },
                        { id: 7, options: res.data.friend.qa[6].options },
                        { id: 8, options: res.data.friend.qa[7].options },
                        { id: 9, options: res.data.friend.qa[8].options },
                        { id: 10, options: res.data.friend.qa[9].options }
                    ];
        
                this.setState({
                    curUser: res.data.user,
                    friendsUser: res.data.friend,
                    questionOptions,
                    answerOptions
                });

            }
        });

    }

    answerHandler = (event) => {
        // console.log(event.target.getAttribute("index"));
        let index = this.state.index;
        if (index < 10) {
            let answer = this.state.answerOptions[index].options[event.target.getAttribute("index")].option;
            let answers = [...this.state.answers, answer];
            index += 1;
            let counter = index;
            this.setState({
                index,
                answers
            });
            if(counter === 10)
            {
                // Header
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
                // Request
                setTimeout(function(){
                    const body = JSON.stringify(this.state.answers);
                    axios.post(`/invite/form/${this.props.uid}/${this.props.fid}`, body, config)
                        .then(res => {
                            if(res.data.msg_id === 0)
                                this.props.history.push('/');
                            else if(res.data.msg_id === 1)
                            {
                                const data = {
                                    user: res.data.user,
                                    msg_id: 1
                                }
                                this.props.sendId(data);
                            }
                            else if (res.data.msg_id === 2)
                            {
                                var invresult = res.data.iid;
                                this.props.history.push(`/invite/results/${this.props.uid}/${this.props.fid}/${invresult._id}`);   
                            }
                        });
                }.bind(this),500);
            }
        }
    }

    render() {
        if(this.state.curUser && this.state.friendsUser && this.state.index < 10)
        {
            return (
                <div>
                    <div className="quizHeader">
                        <span>{this.state.curUser.username}'s Quiz</span>
                    </div>
                    <div className="progressContainer">
                        <div className="progressBar" style={{ width: 10 * this.state.index + "%" }}></div>
                    </div>
                    <Form>
                        <div id="question-card" style={this.state.Style}>
                            <h1 className="question-heading">
                                Question {this.state.index+1}
                            </h1>
                            <div className="triangle-up"></div>
                            <div className="question-text">
                                <textarea className="form-control" name="question" onChange={this.qOnChange} rows="2" value={this.state.questionOptions[this.state.index].ques} />
                            </div>
                            <div className="option_enclosure">
                                {
                                    this.state.answerOptions[this.state.index].options.map((items, index) => (
                                        <div key={items.key} className="input-group">
                                            <div className="input-group-text">
                                                <label className="radio-container">
                                                    <input type="radio" index={index} onClick={(e) => this.answerHandler(e)} checked={false} className="option-input radio" />
                                                </label>
                                            </div>
                                            <textarea maxLength="56" spellCheck="false" type="text" className="form-control textarea-form textarea-form-user" rows="1" cols="60" value={items.option} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </Form>
                    <div className="quizHeader">
                        <span>Choose an answer!</span>
                    </div>
                </div>
            )}
        else
            return (<div></div>)
    }
}

export default withRouter(GetQuizAns);