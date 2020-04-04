import React, { Component } from 'react';
import whatsAppIcon from '../asserts/icons/whatsapp-brands.svg';
import facebookIcon from '../asserts/icons/facebook-f-brands.svg';
import snapchatIcon from '../asserts/icons/snapchat-ghost-brands.svg';
import messengerIcon from '../asserts/icons/facebook-messenger-brands.svg';
import twiterIcon from '../asserts/icons/twitter-brands.svg';
import instagramIcon from '../asserts/icons/instagram-brands.svg';
import lineIcon from '../asserts/icons/line-brands.svg';
import talkIcon from '../asserts/icons/sms-solid.svg';
import vkIcon from '../asserts/icons/vk-brands.svg';
import { Table } from 'reactstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        const user = props.user
        if(user)
        {
            this.state = {
                user: user,
                link: user.sharelink,
                copyStatus: false,
                scoreList: []
            }
        }
        else{
            this.state = {
                user: user,
                link: '',
                copyStatus: false,
                scoreList: []
            }
        }
    }

    textCopyHandler = () => {
        let link = this.state.link;
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.setState({
            copyStatus: true
        })
    }

    componentDidMount()
    {

        axios.get(`/user/share/${this.props.id}`)
        .then(res => {
            if (res.data.msg_id === 0)
            {
                this.props.history.push('/');
            }
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
                    user: res.data.user,
                    link: res.data.user.sharelink,
                    scoreList: newScores
                });
            }
        })

    }

    onClick()
    {
        axios.post(`/user/delete/${this.state.user._id}`)
            .then(res => {
                var curUser= res.data.user;
                const userdata = {
                    user: curUser,
                    msg_id: 1
                }
                this.props.sendId(userdata);
                // this.props.history.push(`/form`);   
            });
    }

    render() {
        if(this.state.user)
        {
            return (
                <div>
                    <div className="quizHeader">{this.state.user.username}</div>
                    <div className="quizHeader quizStatus">Your Quiz is Ready!</div>
                    <div>Now share your quiz-link with your friends!</div>
                    <div>They will try to guess your answers & get a score out of 10.</div>
                    <div className="linkContainer">{this.state.link}</div>
                    {
                        this.state.copyStatus
                            ?
                            <div className="copied">Link Copied!!!</div>
                            :
                            null
                    }
                    <div onClick={this.textCopyHandler} className="linkContainer copyLink">Copy Link</div>

                    <div className="row">
                        <div onClick={() => window.open("https://www.whatsapp.com", '_blank')} className="col socialLink bg-green"><img src={whatsAppIcon} alt="icon" height="30" /> Set Status</div>
                    </div>

                    <div className="row">
                        <div onClick={() => window.open("https://www.facebook.com", '_blank')} className="col socialLink bg-blue"><img src={facebookIcon} alt="icon" height="30" /> Share</div>
                        <div onClick={() => window.open("https://www.snapchat.com", '_blank')} className="col socialLink bg-yellow"><img src={snapchatIcon} alt="icon" height="30" /> Share</div>
                    </div>

                    <div className="row">
                        <div onClick={() => window.open("https://www.messenger.com", '_blank')} className="col socialLink bg-deepBlue"><img src={messengerIcon} alt="icon" height="30" /> Share</div>
                        <div onClick={() => window.open("https://www.twitter.com", '_blank')} className="col socialLink bg-lightBlue"><img src={twiterIcon} alt="icon" height="30" /> Share</div>
                    </div>

                    <div className="row">
                        <div onClick={() => window.open("https://www.instagram.com", '_blank')} className="col socialLink bg-insta"><img src={instagramIcon} alt="icon" height="30" /> Add to bio</div>
                        <div onClick={() => window.open("https://www.whatsapp.com", '_blank')} className="col socialLink bg-green"><img src={whatsAppIcon} alt="icon" height="30" /> Get Status</div>
                    </div>

                    <div className="row">
                        <div onClick={() => window.open("https://line.me", '_blank')} className="col socialLink bg-deepGreen"><img src={lineIcon} alt="icon" height="30" /> Share</div>
                        <div onClick={() => window.open("https://www.facebook.com", '_blank')} className="col socialLink bg-deepYellow"><img src={talkIcon} alt="icon" height="30" /> Share</div>
                    </div>

                    <div className="row">
                        <div onClick={() => window.open("https://www.vk.com", '_blank')} className="col socialLink bg-violet"><img src={vkIcon} alt="icon" height="30" /> Share</div>
                    </div>

                    <div className="scoreResultOf">Scoreboard of {this.state.user.username}</div>

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
                    <div onClick={this.onClick.bind(this)} className="newQuiz">Delete and Create New Quiz</div>

                </div>
            );
        }
        else
        {
            return (<div></div>)
        }
    }
}

export default withRouter(Dashboard);
