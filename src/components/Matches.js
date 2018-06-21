
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { rebase } from './Base.js';
import './Matches.css'

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      partialMatch1:null,
      partialMatch2:null,
      fullMatches:null,
      matchesLoaded:false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleMatches = this.toggleMatches.bind(this);
    this.proposeTrade = this.proposeTrade.bind(this);
  }

  proposeTrade = (trade) => {
    let component = this;
    this.toggle();
    return rebase.initializedApp.database().ref().child(`proposals/${trade.otherUser}`)
    .push({

        proposingName: component.props.userObj.name,
        proposingUid: component.props.userObj.uid,
        offeringGame:trade.userGives,
        receivingUid:trade.otherUser,
        inExchangeFor:trade.userGets

    })

  }

  toggleMatches = () => {
    console.log('toggleMatches');
    let component = this
    let userWantsArray = [];
    let userHavesArray = [];
    let allWants = [];
    let allHaves = [];
    let matchesArray = [];
    // Match one means the user HAS a game that another user WANTS
    let match1 = [];
    // Match two means the user Wants a game that another user HAS
    let match2 = [];
    // Match 3 meant that both are true;
    let match3 = [];
    let tradeNum = 0;
    if(component.props.userObj.name){
      rebase.fetch(`haves/`, {
          context: this,
          asArray: true,
          then(data){
            console.log(data);
            let uid = component.props.userObj.uid
            for(let i=0;i<data.length;i++){
              let currentUser = data[i].key;
              if (currentUser == uid){
                userHavesArray = Object.keys(data[i]);
                userHavesArray =  userHavesArray.slice(0, -1);
                
              }else{
                allHaves.push(data[i]);
              }
            }

            
            console.log('userHaves', userHavesArray);
            console.log('allHaves',allHaves);
            // component.setState({
            //   haves:data
              
            // });
          }
        }).then(
          rebase.fetch(`wants/`, {
              context: this,
              asArray: true,
              then(data){
                let uid = component.props.userObj.uid

                for(let i=0;i<data.length;i++){
                  let currentUser = data[i].key;
                  if (currentUser == uid){
                    userWantsArray = Object.keys(data[i]);
                    userWantsArray =  userWantsArray.slice(0, -1);
                  }else{
                    allWants.push(data[i]);
                  }
                }

                console.log('userWants', userWantsArray);
                console.log('allWants',allWants);
                for (let i=0;i<userHavesArray.length;i++){
                  let currentUserHave = userHavesArray[i];

                  for(let z=0;z<allWants.length;z++){
                    let currentOtherUserWants = Object.keys(allWants[z]);
                    for(let x=0;x<currentOtherUserWants.length;x++){
                      let otherUserWantsGame = currentOtherUserWants[x];
                      if(currentUserHave == otherUserWantsGame){
                        match1.push([allWants[z].key, allWants[z][`${currentUserHave}`]])
                      }
                    }
                  }
                }

                for (let i=0;i<userWantsArray.length;i++){
                  let currentUserWant = userWantsArray[i];
                  console.log("currentUserWant",currentUserWant);
                  // console.log(currentUserHave);
                  for(let z=0;z<allHaves.length;z++){
                    let currentOtherUserHas = Object.keys(allHaves[z]);
                    // console.log("otheruserhas",currentOtherUserHas);
                    for(let x=0;x<currentOtherUserHas.length;x++){
                      let otherUserHasGame = currentOtherUserHas[x];
                      // console.log("user Has:",currentUserHave,"||||||", 'someone WantsGame:',otherUserWantsGame);
                      if(currentUserWant == otherUserHasGame){
                        console.log("ITS A MATCHHHHH",currentUserWant,otherUserHasGame);
                        match2.push([allHaves[z].key, allHaves[z][`${currentUserWant}`]])
                        for(let q=0;q<match1.length;q++){
                          if(match1[q][0] == allHaves[z].key){
                            match3.push({ 
                              userGets:match1[q][1],
                              userGives:allHaves[z][`${currentUserWant}`],
                              otherUser:allHaves[z].key}
                              );
                            // match3.userGets = allHaves[z][`${currentUserWant}`]
                          }
                        }

                      }
                    }
                  }
                }
                console.log('match1',match1);
                console.log('match2',match2);
                console.log('match3',match3);
                component.setState({
                  modal: !this.state.modal,
                  partialMatch1:match1,
                  partialMatch2:match2,
                  fullMatches:match3,
                  matchesLoaded:true
      
                  
                })

              }
            })
        )
    }else{
        window.alert("Please Login");
    }
  }




  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    if(this.state.matchesLoaded === true && this.state.fullMatches.length > 0){

      

      const fullMatches = this.state.fullMatches.map((item,index) => {
        return(
            <div className='match-box'>
            <h5>You Get:</h5>
            <div className='user-gets'>
            <h4>{item.userGets.name}</h4>
            <img src={item.userGets.image.thumb_url} />
            </div>
            <h5>You Trade:</h5>
            <div className='user-gives'>
            <h4>{item.userGives.name}</h4>
            <img src={item.userGives.image.thumb_url} />
            </div>
            <Button className='propose-btn' onClick={() => { this.proposeTrade(item) }} color="warning"><h5>Propose</h5><h5>Trade</h5></Button>
            </div>

    )}
  
  
  
  )
      console.log("MYSTATE",this.state);
    return (
      <div>
        <Button color="primary" onClick={() => { this.toggleMatches() }}>See Matches</Button>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Potential Trades</ModalHeader>
          <ModalBody>
          <div id='all-matches'>
          <div id='full-match-box' className='match-box-full'>
          <h2>Matches</h2>
            {fullMatches}
          </div>
          {/*<div id='match-1-box' className='match-box-full'>
          <h2>Partial Matches</h2>
          </div>
          <div id='match-2-box' className='match-box-full'>
          <h2>Partial Matches</h2>
    </div> */}
          </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }else if(this.state.matchesLoaded == true){
    return(
    <div>
    <div>
    <Button color="primary" onClick={() => { this.toggleMatches() }}>See Matches</Button>
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader toggle={this.toggle}>Matches</ModalHeader>
      <ModalBody>
      <h5>You Have No Matches</h5>
      </ModalBody>
    </Modal>
  </div>
    </div>
  )}else{
    return(
      <div>
      <div>
      <Button color="primary" onClick={() => { this.toggleMatches() }}>See Matches</Button>
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Matches</ModalHeader>
        <ModalBody>
        <h5>Loading</h5>
        </ModalBody>
      </Modal>
    </div>
      </div>
    )
  }}
}

export default Matches;