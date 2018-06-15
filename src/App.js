import React, { Component } from 'react';
import './App.css';
import Topnav from'./components/TopNav';
import Billboard from './components/Billboard';
import Login from './components/Login';
import Body from './components/Body';
import {rebase} from './components/Base';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      userObj: {
        email: null,
        uid: null,
        photo:null,
        name:null,
        resultsReceived:false,
        searchData:null
      }
    }
      this.appSearchResults = this.appSearchResults.bind(this);

    

    // this.getUserData = this.getUserData.bind(this);    
       
  }

  appSearchResults(results){
    let component = this;
    component.setState({
      resultsReceived:true,
      searchData:results
    })

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
      <Billboard search={this.appSearchResults} />
        <Topnav userObj={this.state.userObj} />
        <Body searchResults={this.state.searchData} userObj={this.state.userObj}/>
      </div>
    );
  }
}

export default App;
