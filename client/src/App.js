import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavabr from './components/AppNavbar';
import Login from './components/Login';
import { Route, Switch, withRouter, useParams,Redirect } from 'react-router-dom';
import CreateQuiz from './components/CreateQuiz';
import LoginNew from './components/invite/LoginNew'
import GetQuizAns from './components/invite/GetQuizAns';
import Dashboard from './components/dashboard';
import YourResult from './components/yourResult';
import Background from './asserts/icons/background-01.jpg'
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      frienduser: null,
      newU: null
    }
  }
  getId(userdata)
  {
    this.setState({
      user: userdata.user,
      newU: userdata.newU
    });
    
    if(this.state.user._id)
    {
      this.props.history.push(`/form`);
    }

  }

  LoginPage = (props) => {
    return (
      <Login 
      sendId={this.getId.bind(this)}
    />
    )
  }

  getData_Quiz(userdata)
  {
    this.setState({
      user: userdata.user
    });
    const msg_id = userdata.msg_id;
    if(msg_id === 2)
    {
      this.props.history.push(`/user/share/${this.state.user._id}`);
    }
  }

  CreateQuizPage = (props) => {
    const user = this.state.user;
    return (
      <CreateQuiz
        user={user}
        sendId={this.getData_Quiz.bind(this)} 
      />
    )
  }

  getData_NewLogin(data)
  {
    if(data.msg_id === 1)
    {
      this.setState({
        user: data.user
      });
      this.props.history.push(`/form`);
    }
    else if (data.msg_id === 2)
    {
      this.setState({
        user: data.user,
        frienduser: data.frienduser
      })
      this.props.history.push(`/invite/form/${this.state.user._id}/${this.state.frienduser._id}`);
    }
  }

  LoginNewPage = (props) => {
    let { id } = useParams();
    return (
      <LoginNew
        id = {id}
        sendId={this.getData_NewLogin.bind(this)} 
       />
    )
  }

  getDashBoar(userdata)
  {
    this.setState({
      user: userdata.user
    });
    if(userdata.msg_id === 1)
    {
      this.props.history.push(`/form`);
    }
  }

  DashboardPage = (props) => {
    let { id } = useParams();
    return (
      <Dashboard
       id={id}
       user = {this.state.user}
       sendId={this.getDashBoar.bind(this)} 
       />
    )
  }

  getQuizAnsData(data)
  {
    if(data.msg_id === 1)
    {
      this.setState({
        user: data.user
      });
      this.props.history.push(`/form`);
    }
  }

  GetQuizAnsPage = (props) => {
    let { uid, fid } = useParams();
    return (
      <GetQuizAns
        uid = { uid }
        fid = { fid }
        curUser = {this.state.user}
        frienduser = {this.state.frienduser}
        sendId={this.getQuizAnsData.bind(this)}  
      />
    )
  }

  getYourResultData(data)
  {
    if(data.msg_id === 1)
    {
      this.setState({
        user: data.user
      });
      this.props.history.push(`/form`);
    }
  }

  YourResultPage = (props) => {
    let {uid,fid,iid} = useParams();
    return (
      <YourResult
        uid = {uid}
        fid = {fid}
        iid = {iid}
        sendId={this.getYourResultData.bind(this)}  
      />
    )
  }

sectionStyle = {
  width: "auto",
  height: "auto",
  backgroundImage: `url(${Background})`
};


  render() {
    return (
      <Switch>
        <div id="base" style={ this.sectionStyle }>
          <div id="container">
            <AppNavabr />
            <Route exact path="/" component={this.LoginPage} />
            <Route exact path="/form" component={this.CreateQuizPage} />
            <Route exact path="/user/share/:id" component={this.DashboardPage} />
            <Route exact path="/invite/:id" component={this.LoginNewPage} />
            <Route exact path="/invite/form/:uid/:fid" component={this.GetQuizAnsPage} />
            <Route exact path="/invite/results/:uid/:fid/:iid" component={this.YourResultPage} />
          </div>
        </div>
     </Switch>
    )
  }
}

export default withRouter(App);

