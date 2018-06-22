import React from 'react';
import './TopNav.css';
import Matches from './Matches';
import Lists from './Lists';
import TradesUnderway from './TradesUnderway';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { rebase } from './Base.js';



export default class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal:false,
            nestedModal: false,
            closeAll: false,
            userObj:this.props.userObj,
            proposals:{
              newProposals:false,
              proposalsReceived:null,
              proposalCount:null
            }
        }
        this.toggle = this.toggle.bind(this);
        this.toggleNested = this.toggleNested.bind(this);
        this.toggleAll = this.toggleAll.bind(this);

      }



      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }


      toggleNested(item) {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: false,
          clickedProposal:item
        });
      }
    
      toggleAll() {
        this.setState({
          nestedModal: !this.state.nestedModal,
          closeAll: true
        });
      }
      
      componentWillReceiveProps(nextProps){
        console.log("next props",nextProps)
        if (nextProps.proposals.newProposals == true && nextProps.userObj.name){
        this.setState({
          userObj:this.props.userObj,
          proposals:{
            newProposals:nextProps.proposals.newProposals,
            proposalsReceived:nextProps.proposals.proposalsReceived,
            proposalCount:nextProps.proposals.proposalCount,
            
          }

        })
      }else if(nextProps.proposals.newProposals == false && nextProps.userObj){
        this.setState({
        userObj:this.props.userObj,
        proposals: 
        {newProposals:false,
        proposalsReceived:null,
        proposalCount:null
        }
      })
      }else{
        this.setState({
          userObj:this.props.userObj,
          proposals: 
          {newProposals:false,
          proposalsReceived:null,
          proposalCount:null
          }
        })
      }
      }

noProposals(){
  console.log("this.state",this.state.userObj);
  if(this.state.userObj.name){
  window.alert("You Have No Proposals")
  }else{
    window.alert("Please Login to View Proposals");
  }
}

removeProposal(item){
  let component = this;
  let index = this.state.proposals.proposalsReceived.indexOf(this.state.clickedProposal);
  let removeGame = this.state.clickedProposal.offeringGame.name;
  console.log("INDEXOF",index);
  let copyProposalsReceived = this.state.proposals.proposalsReceived;
  let newProposalCount = this.state.proposals.proposalCount;
  newProposalCount=newProposalCount-1;
  let newNewProposals;
  copyProposalsReceived.splice(index,1);
  console.log("duplicates bitches",copyProposalsReceived);
  for(let i=0;i<copyProposalsReceived.length;i++){
    let currentProposal = this.state.proposals.proposalsReceived[i];
    if(currentProposal.offeringGame.name == removeGame){
      let otherIndex = copyProposalsReceived.indexOf(currentProposal)
      copyProposalsReceived.splice(otherIndex,1);
      newProposalCount = newProposalCount - 1;

    }
  }
  if(newProposalCount>0){
    newNewProposals = true;
  }else{
    newNewProposals = false;
  }
  
  this.setState({
    proposals:{
      proposalCount:newProposalCount,
      proposalsReceived:copyProposalsReceived,
      newProposals:newNewProposals

    }
  })
  //  rebase.remove(`proposals/${component.props.userObj.uid}/${component.state.clickedProposal.offeringGame.name}`);

   return rebase.initializedApp.database().ref().child(`proposals/`)
   .update({

    [component.props.userObj.uid]: this.state.proposals.proposalsReceived
    
 
    } )

}
declineTrade(item){
let component = this;

this.setState({
  clickedDecline:item
})
this.deleteTrade(item)
}

deleteTrade(item){
  console.log("FOOFIGHTER",item)
  let component = this;
  let index = this.state.proposals.proposalsReceived.indexOf(item);
  let removeGame = item.offeringGame.name;
  console.log("INDEXOF",index);
  let copyProposalsReceived = this.state.proposals.proposalsReceived;
  let newProposalCount = this.state.proposals.proposalCount;
  newProposalCount=newProposalCount-1;
  let newNewProposals;
  copyProposalsReceived.splice(index,1);

  this.setState({
    proposals:{
      proposalCount:newProposalCount,
      proposalsReceived:copyProposalsReceived,
      newProposals:newNewProposals

    }
  })
  //  rebase.remove(`proposals/${component.props.userObj.uid}/${component.state.clickedProposal.offeringGame.name}`);

   return rebase.initializedApp.database().ref().child(`proposals/`)
   .update({

    [component.props.userObj.uid]: this.state.proposals.proposalsReceived
    
 
    } )

  
}

acceptTrade(name,address,city,state,zip) {
  console.log("thisstateclicked",this.state.clickedProposal);
  let component = this;
  let involvedUsers;



 
  console.log(name,address,city,state,zip)
  let tradeID = Math.floor(Math.random() * (99999 - 10000) ) + 100000

  console.log("BIIIIIIITCH",component.props.userObj.uid,component.state.clickedProposal.offeringGame.name);

console.log(component.props.userObj.uid,component.state.clickedProposal.inExchangeFor.name)
  //  rebase.remove(`haves/${component.props.userObj.uid}/${component.state.clickedProposal.offeringGame.name}`);
  //  rebase.remove(`wants/${component.props.userObj.uid}/${component.state.clickedProposal.inExchangeFor.name}`);
  //  rebase.remove(`haves/${component.state.clickedProposal.proposingUid}/${component.state.clickedProposal.inExchangeFor.name}`);
  //  rebase.remove(`wants/${component.state.clickedProposal.proposingUid}/${component.state.clickedProposal.offeringGame.name}`);
this.toggleAll();
console.log("beeeeeeetch",this.state,"sluuuut",this.props);
// this.removeProposal()
// this.setState({
//   proposals:{
//     proposalsReceived
//   }
// })
  // involvedUsers = (this.state.clickedProposal.receivingUid) + "," + (this.state.clickedProposal.proposingUid);

  return rebase.initializedApp.database().ref().child(`acceptedTrades/`)
  .update({
[tradeID]:{
  proposeUid:component.state.clickedProposal.proposingUid,
  otherUid:component.state.clickedProposal.receivingUid,
  stage:1,
      [component.state.clickedProposal.proposingUid]: 
                  {
                    name:component.state.clickedProposal.proposingName,
                    uid:component.state.clickedProposal.proposingUid,
                    trading:component.state.clickedProposal.offeringGame,
                    receiving:component.state.clickedProposal.inExchangeFor,
                    sentGame:false,
                    message:`Trade for ${component.state.clickedProposal.inExchangeFor.name} been accepted. Please send Your address info by clicking here`,
                    receivedGame:false,
                    sentAddress:false,
                    proposed:true,
                    addressInfo:{
                      name:null,
                      streetAddress:null,
                      city:null,
                      state:null,
                      zip:null,
                    }


                  },
      [component.state.clickedProposal.receivingUid]: {
                  name:this.props.userObj.name,
                  uid:component.state.clickedProposal.receivingUid,
                  trading:component.state.clickedProposal.inExchangeFor,
                  receiving:component.state.clickedProposal.offeringGame,
                  sentGame:false,
                  receivedGame:false,
                  sentAddress:true,
                  proposed:false,
                  message:`Awaiting address from ${component.state.clickedProposal.proposingName}.`,
                  addressInfo:{
                    line1:name,
                    line2:address,
                    line3:city + "," + state + " " + zip
                  },
      }


   } })

}

render() {
  console.log("ITSMYSTATEBIIITCH",this.state);
if(this.state.proposals.proposalCount){
  const proposalMatches = this.state.proposals.proposalsReceived.map((item,index) => {
    return(
      <div key={index} className='match-box'>
      {item.proposingName} is offering you:
          <div className='user-gets'>
          <h4>{item.offeringGame.name}</h4>
          <img src={item.offeringGame.image.thumb_url} />
          </div>
In exchange for
          <div className='user-gives'>
          <h4>{item.inExchangeFor.name}</h4>
          <img src={item.inExchangeFor.image.thumb_url} />
          </div>
          <div className='have-want-btns'>
          <Button className='accept-btn' onClick={() => { this.toggleNested(item) }} color="success"><h5>Accept</h5><h5>Trade</h5></Button>
          <Button className='decline-btn' onClick={() => { this.declineTrade(item) }} color="warning"><h5>Decline</h5><h5>Trade</h5></Button>
        </div>
          </div>

)})
    return(
        <div id='top-nav'>
        <nav color='#da291c' className="navbar navbar-expand-lg navbar-dark bg-primary">

        <div>
          <ul className="navbar-nav">
            <Lists userObj={this.props.userObj} />
            <Matches userObj={this.props.userObj} />
            <Button color="primary" onClick={() => { this.toggle() }} >Proposals Received<Badge color="danger">{this.state.proposals.proposalCount}</Badge></Button>
            <TradesUnderway userObj={this.props.userObj} />

          </ul>
        </div>
      </nav>
      <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
  <ModalHeader toggle={this.toggle}>Trade Proposal</ModalHeader>
  <ModalBody>
  <div className='all-matches'>
  <div className='match-box-full'>
    {proposalMatches}
  </div>
</div>


<Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
<ModalHeader>Please submit Your address</ModalHeader>
<ModalBody><Form>
<FormGroup row>
  <Label for="name" sm={2}>Name</Label>
  <Col sm={10}>
    <Input type="text" name="name" id="addressName" />
  </Col>
</FormGroup>
<FormGroup row>
  <Label for="address" sm={2}>Street Address</Label>
  <Col sm={10}>
    <Input type="text" name="street-address" id="street-address" />
  </Col>
</FormGroup>
<FormGroup row>
  <Label for="city" sm={2}>City</Label>
  <Col sm={10}>
    <Input type="text" name="city" id="city-address" />
  </Col>
</FormGroup>
<FormGroup row>
<Label for="state" sm={2}>State</Label>
<Col sm={10}>
  <Input type="text" name="state" id="state-address" />
</Col>
</FormGroup>
<FormGroup row>
<Label for="zipcode" sm={2}>Zipcode</Label>
<Col sm={10}>
<Input type="text" name="zip" id="zip-address" />
</Col>
</FormGroup>
<FormGroup check row>
  <Col sm={{ size: 10, offset: 2 }}>

    <Button onClick={() => { this.acceptTrade(document.getElementById('addressName').value,document.getElementById('street-address').value,document.getElementById('city-address').value,document.getElementById('state-address').value,document.getElementById('zip-address').value) }} color='success'>Accept</Button>
  </Col>
</FormGroup>
</Form>
</ModalBody>
</Modal>


  </ModalBody>

</Modal>
  </div>

    )
}else{
  return(
    <div id='top-nav'>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

    <div>
      <ul className="navbar-nav">
        <Lists userObj={this.props.userObj} />
        <Matches userObj={this.props.userObj} />
      <Button color="primary" onClick={() => { this.noProposals() }} >Proposals Received</Button>
        <TradesUnderway userObj={this.props.userObj} />
      </ul>
    </div>
  </nav>
  
  </div>
)
}
}
}