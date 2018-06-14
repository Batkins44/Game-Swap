import React from 'react';
import { Button } from 'reactstrap';
import {loginWithGoogle,logout} from './Auth';
import App from '../App';
import './Login.css'

export default class Login extends React.Component {


  render() {

    if(!this.props.userObj.uid){
        return (
            <Button color='primary' onClick={() => { loginWithGoogle() }}>Login</Button>

    );
}   else{
    return (
        <div id='login'>
        <img src={this.props.userObj.photo} />
        <p>Welcome, {this.props.userObj.name}</p>
        <h6 onClick={() => { logout() }}>Logout</h6>
        </div>
    );
}
  }
}