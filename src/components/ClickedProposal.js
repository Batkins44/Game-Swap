import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      proposals:{
        newProposals:false,
        proposalsReceived:null,
        proposalCount:null,
        userSeenModal:false
      }
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
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

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
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
            <div className='have-want-btns'>
            <Button className='accept-btn' onClick={() => { this.toggleNested(item) }} color="success"><h5>Accept</h5><h5>Trade</h5></Button>
            <Button className='decline-btn' onClick={() => { this.declineTrade() }} color="warning"><h5>Decling</h5><h5>Trade</h5></Button>
          </div>            
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
          <div>
          </div>
      )
  }}
}

export default ModalExample;