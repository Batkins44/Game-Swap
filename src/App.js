import React, { Component } from 'react';
import './App.css';
import Topnav from'./components/TopNav';
import Billboard from './components/Billboard';
import Login from './components/Login';
import Body from './components/Body';
import Footer from './components/Footer';
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
      this.logoutState = this.logoutState.bind(this);

    

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
                        component.setState({
                          proposals: 
                          {newProposals:true,
                          proposalsReceived:proposalsReceived,
                          proposalCount:proposalsReceived.length,
                          userSeenModal:true
                          }
                        })

                      }
                    })
                  }else{
                    component.setState({
                      proposals: 
                      {
                        newProposals:false,
                      proposalsReceived:null,
                      proposalCount:null,
                      userSeenModal:true
                      }
                    })

                  }
                }
              })
        } else{
          console.log(this.state,"before")
            this.setState({
                authed: false,
                userObj: {
                  email: null,
                  uid: null,
                  photo:null,
                  name:null,
                  proposals: 
                  {newProposals:false,
                  proposalsReceived:null,
                  proposalCount:null
                  }
                }
            })
            console.log(this.state,"after")
        }
    })
  }

  logoutState(){
    this.setState({
      authed: false,
      userObj: {
        email: null,
        uid: null,
        photo:null,
        name:null,
        proposals: 
        {newProposals:false,
        proposalsReceived:null,
        proposalCount:null
        }
      }
    }, function () {
      console.log(this.state);
  });
    console.log("YESSIRRRR",this.state)

}

  render() {
    return (
      <div className="App">
      <Login userObj = {this.state.userObj} logoutState={this.logoutState} />
      <Billboard search={this.appSearchResults} />
        <Topnav userObj={this.state.userObj} proposals={this.state.proposals} />
        <Body searchResults={this.state.searchData} userObj={this.state.userObj}/>
        <ProposalModal proposals={this.state.proposals} userObj={this.state.userObj}/>
        <Footer />
      </div>
    );
  }
}

export default App;
