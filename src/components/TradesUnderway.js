import React from 'react';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { rebase } from './Base.js'

import './TradesUnderway.css'

class OngoingTrades extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false,
      relevantTrades:null,
      acceptedTrades:null
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  componentDidMount(){
    rebase.syncState(`acceptedTrades`, {
    context: this,
    state: 'acceptedTrades',
    })}

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleNested(item) {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
      clickedItem: item
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  sendAddress(name,address,city,state,zip){
    console.log(name,address,city,state,zip)
  this.setState({
    acceptedTrades:
    
    
                                                          {

            [this.state.clickedItem[2]]:
                                                      {
                                                        stage:2,
                                                        [this.state.clickedItem[1].otherUid]: {


                                                                                              },
                                                              [this.state.clickedItem[1].proposeUid]: {
                                                          sentAddress:true,
                                                          message:'Address Sent',
                                                          addressInfo:{
                                                            name:name,
                                                            streetAddress:address,
                                                            city:city,
                                                            state:state,
                                                            zip:zip,
                                                                      }
                                                                                                      }
                                                    }
                                                          }


   }) }
  

  checkOngoingTrades(){
      console.log("yep",this.state)
      let relevantTrades = [];
      rebase.fetch(`acceptedTrades/`, {
        context: this,
        asArray:true,
        then(data){
          for(let i=0;i<data.length;i++){
            let tradeValues = Object.values(data[i]);
            for(let z=0;z<tradeValues.length;z++){
              console.log(tradeValues[z],'tradevaluesssss');
              if(tradeValues[z].uid == this.props.userObj.uid){
                console.log('found')
                relevantTrades.push([tradeValues[z].message,data[i],data[i].key]);
              }
            }
          }
          console.log(relevantTrades,"relevantTrADES");
          this.setState({
            relevantTrades:relevantTrades
          })
        }})
      this.setState({
        modal: !this.state.modal
      });
  }

  render() {
    let messages;
    if(this.state.relevantTrades){
    messages = this.state.relevantTrades.map((item,index) => {
      return(
      <div className='message-box' key={index}>
      <h5>{item[0]}</h5>
      <Button className="send-address" color="success" onClick={() => { this.toggleNested(item) }}>Send Address</Button>
      </div>
      )
    })
    console.log("statemessage",this.state.relevantTrades);
    console.log("messages",messages);
  }else{
    messages = 'You have no trades underway. First send or accept a proposal'
  }

    return (
      <div>
      <Button color="primary" onClick={() => { this.checkOngoingTrades() }} >Trades Underway</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
          {messages}
            <br />

            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>Please Submit your address</ModalHeader>
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
              
                  <Button onClick={() => { this.sendAddress(document.getElementById('addressName').value,document.getElementById('street-address').value,document.getElementById('city-address').value,document.getElementById('state-address').value,document.getElementById('zip-address').value) }} color='success'>Accept</Button>
                </Col>
              </FormGroup>
              </Form>
              </ModalBody>

            </Modal>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default OngoingTrades;