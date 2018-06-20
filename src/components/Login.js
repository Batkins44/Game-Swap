import React from 'react';
import { Button } from 'reactstrap';
import {loginWithGoogle} from './Auth';
import './Login.css';
import {rebase} from './Base';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

          this.logout = this.logout.bind(this);

    
        
    
 
           
      }

logout() {
    console.log("logout props",this.props);
    this.props.logoutState()
       return rebase.initializedApp.auth().signOut()

     }

  render() {

    if(!this.props.userObj.uid){
        return (
            <Button color='primary' onClick={() => { loginWithGoogle() }}>Login</Button>

    );
}   else{
    return (
        <div id='login'>
        <img alt='user-icon' src={this.props.userObj.photo} />
        <p>Welcome, {this.props.userObj.name}</p>
        <h6 onClick={() => { this.logout() }}>Logout</h6>
        </div>
    );
}
  }
}