import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Topnav from'./components/TopNav';
import Billboard from './components/Billboard';
import Login from './components/Login';
import Body from './components/Body';
import { Nav, NavItem, NavLink } from 'reactstrap';
import firebase from 'firebase';
import {rebase} from './components/Base';
import { loginWithGoogle,logout } from './components/Auth';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      userObj: {
        email: null,
        uid: null,
        photo:null,
        name:null
      }
    }

    // this.getUserData = this.getUserData.bind(this);    
       
  }

  // getUserData(user) {
  //   let userData;
  //   let userZip;
  //   console.log("GET USER DATA USER", user);
 
  //    var ref = firebase.database().ref("users");
  //    ref.once("value").then(function (snapshot) {
  //      snapshot.forEach(function (childSnapshot) {
  //        var userFBKey = childSnapshot.key;
  //        if (user.uid === userFBKey) {
  //          // key = userFBKey;
  //          userData = childSnapshot.val();
  //          userZip = userData.zip;
  //        }
  //      });
  //      // console.log("Get user data zip", userZip)
 
  //    });
  //  }

  componentDidMount() {
    this.authListener = rebase.initializedApp.auth().onAuthStateChanged((user) =>{
      // console.log("USER", user);
        if (user) {
            this.setState({
                authed: true,
                userObj: {
                  email: user.email,
                  uid: user.uid,
                  photo:user.photoURL,
                  name:user.displayName
                }
                
              });
          // this.syncing();   
          // this is working but I can't get into the Weather component with the grabbed fb zipcode
          // this.getUserData(this.state.userObj);     
        } else{
            this.setState({
                authed: false,
                userObj: {
                  email: null,
                  uid: null,
                  photo:null,
                  name:null
                }
            })
        }
    })
  }

  render() {
    return (
      <div className="App">
      <Login userObj = {this.state.userObj} />
      <Billboard />
        <Topnav userObj={this.state.userObj} />
        <Body />
      </div>
    );
  }
}

export default App;
