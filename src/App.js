import React, { Component } from 'react';
import './App.css';
import Topnav from'./components/TopNav';
import Billboard from './components/Billboard';
import Login from './components/Login';
import Body from './components/Body';
import ProposalModal from './components/ProposalModal';
import {rebase} from './components/Base';
import { Button } from 'reactstrap';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authed: false,
      proposals:{
        newProposals:false,
        proposalsReceived:null,
        proposalCount:null
      },
      userObj: {
        email: null,
        uid: null,
        photo:null,
        name:null,
        resultsReceived:false,
        searchData:null
      }
    }
      this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }



  componentDidMount() {
    let component = this;
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
                
              })
              rebase.fetch(`proposals/`, {
                context: this,
                then(data){

                 let usersProposedTo = Object.keys(data);

                  if(usersProposedTo.includes(this.state.userObj.uid)){
                    console.log("Matched the fuck up");
                    rebase.fetch(`proposals/${this.state.userObj.uid}`, {
                      context: this,
                      asArray:true,
                      then(data){
                        let proposalsReceived = Object.values(data);
                        console.log("THEITEMS",proposalsReceived);
                        component.setState({
                          proposals: 
                          {newProposals:true,
                          proposalsReceived:proposalsReceived,
                          proposalCount:proposalsReceived.length
                          }
                        })
                        console.log("i dont get it",this.state);
                      }
                    })
                  }
                }
              })
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
        <ProposalModal proposals={this.state.proposals}/>
      </div>
    );
  }
}

export default App;
