import React, { Component } from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class YourResult extends Component {

    constructor(props) {
        super(props);
        const curUser = JSON.parse(localStorage.getItem('user'));
        const friendsUser = JSON.parse(localStorage.getItem('refUser'));
        const result = JSON.parse(localStorage.getItem('result'));
        if(curUser && friendsUser && result)
        {
            this.state = {
                curUser: curUser,
                friendUser: friendsUser,
                result: result,
                user: curUser.username,
                score: result.score,
                scoreList: [],
                friendtype:""
            }
        }
        else
        {
            this.state = {
                curUser: curUser,
                friendUser: friendsUser,
                result: result,
                user: null,
                score: null,
                scoreList: [],
                friendtype:""
            }
        }
    }
    

    componentWillMount()
    {
        axios.get(`/invite/results/${this.props.uid}/${this.props.fid}/${this.props.iid}`)
        .then(res => {
            if(res.data.msg_id === 2)
            {
                this.props.history.push(`/invite/form/${this.props.uid}/${this.props.fid}`)
            }
            else if (res.data.msg_id === 1)
            {
                var user = res.data.user;
                const data = {
                    user: res.data.user,
                    msg_id: 1
                } 
                this.props.sendId(data);
                //this.props.history.push('/form');    
            }
            else if (res.data.msg_id === 0)
                this.props.history.push('/')
            else
            {
                let scores = res.data.invites;
                let newScores = [];
                for(let i = 0; i < scores.length; i++)
                {
                    let score = { name: scores[i].friendname, score: scores[i].score }
                    newScores.push(score)
                }
                this.setState({
                    scoreList: newScores,
                    curUser: res.data.user,
                    friendUser: res.data.friend,
                    score: res.data.invite.score,
                    friendtype:res.data.invite.friendtype
                });
            }
        })
    }

    onClick()
    {
        const data = {
            user: this.state.curUser,
            msg_id: 1
        }
        this.props.sendId(data);
        // this.props.history.push(`/form`); 
    }

    render() {
        if(this.state.curUser && this.state.friendUser)
        {
            return (
                <div>
                    <div className="resultQuiz">Excellent, you have scored {this.state.score} in the quiz about {this.state.user}</div>
                    <div className="resultQuiz">{this.state.friendtype}</div>

                    <div className="meterContainer">
                        <div className="dial">
                            <ul className="meter">
                                <li className="low"></li>
                                <li className="medium"></li>
                                <li className="high"></li>
                            </ul>
                            <div className="dialInfo">
                                <div className="inner" style={{ transform: "rotate(" + (this.state.score * 17.3) + "deg)" }}>
                                    <div className="arrow"></div>
                                </div>
                                <div className="per">{this.state.score * 10}%</div>
                            </div>
                        </div>
                    </div>

                    <div className="inviteText">Now, it's your turn. Create your own quiz and send it to your friends</div>
                    <div className="inviteLink" onClick={this.onClick.bind(this)}>Create Your Quiz</div>
                    <div className="scoreResultOf">Scoreboard of {this.state.user}</div>

                    <Table className="scoreTable">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody className="resultTable">
                            {
                                this.state.scoreList.length !== 0
                                    ?
                                    this.state.scoreList.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.score}</td>
                                        </tr>
                                    ))
                                    :
                                    null
                            }
                        </tbody>
                    </Table>
                    {
                        this.state.scoreList.length === 0
                            ?
                            <div className="noScore">No one has given this quiz yet.</div>
                            :
                            null
                    }

                    <div className="inviteLink" onClick={this.onClick.bind(this)}>Create Your Quiz</div>
                </div>
            );
        }
        else
        {
            return(<div></div>)
        }
    }
}

export default withRouter(YourResult);