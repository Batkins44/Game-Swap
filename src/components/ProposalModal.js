import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      proposals:{
        newProposals:false,
        proposalsReceived:null,
        proposalCount:null,
        userSeenModal:false
      }
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps){
      let component = this;
      if(nextProps.proposals.newProposals == true && component.state.proposals.userSeenModal == false){
        this.setState({
            modal:!this.state.modal,
            proposals:{
                newProposals:true,
                proposalsReceived:nextProps.proposals.proposalsReceived,
                proposalCount:nextProps.proposals.proposalCount,
                userSeenModal:true
              }
        })
      }console.log(this.state,'gimmethefiftystates');
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
      if(this.state.proposals.newProposals == true){
        console.log(this.state.proposals,"another one");

    const proposalMatches = this.state.proposals.proposalsReceived.map((item,index) => {
        return(
            <div className='match-box'>
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
            <Button className='propose-btn' onClick={() => { this.proposeTrade(item) }} color="success"><h5>Accept</h5><h5>Trade</h5></Button>
            </div>

    )})
  
  
  
  
    return (
      <div>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Trade Proposal</ModalHeader>
          <ModalBody>
          <div id='all-matches'>
          <div id='full-match-box' className='match-box-full'>
            {proposalMatches}
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
  }else{
      return(
          <div>
          </div>
      )
  }}
}

export default ModalExample;