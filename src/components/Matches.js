
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { rebase } from './Base.js';

class Matches extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleMatches = this.toggleMatches.bind(this);
  }

  toggleMatches(){
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
                              userGives:allHaves[z][`${currentUserWant}`]});
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
                // component.setState({
                //   modal: !this.state.modal,
                //   wants:data,
                //   listsLoaded:true
  
                  
                // });
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
    return (
      <div>
        <Button color="primary" onClick={() => { this.toggleMatches() }}>See Matches</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Matches;