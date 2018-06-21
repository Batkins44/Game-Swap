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

            [this.state.clickedItem[5]]:

                                                      {
                                                        
                                                        stage:2,
                                                        [this.state.clickedItem[2]]: {
                                                          message:`Please send ${this.state.clickedItem[0].trading.name} to ${this.state.clickedItem[1].name} as soon as possible, then mark it as sent with the button`,

                                                                                              },
                                                              [this.state.clickedItem[3]]: {
                                                          sentAddress:true,
                                                          message:`Please send ${this.state.clickedItem[1].trading.name} to ${this.state.clickedItem[0].name} as soon as possible, then mark it as sent with the button`,
                                                          addressInfo:{
                                                            line1:name,
                                                            line2:address,
                                                            line3:city + "," + state + " " + zip
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
                console.log('found',tradeValues)
                relevantTrades.push(tradeValues);
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

  markSent(item){
    console.log(item,"item")
    if(item[0].sentGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [item[5]]:
                                                            
                                                          {
                                                            stage:3,
                                              [item[3]]: {
                                                              
                                                              message:`Thanks For sending the game. Please click the last button to mark the game as received, when it arrives`,
                                                              sentGame:true
                                                                                                          },
                                              [item[2]]:{
                                                message:`Thanks For sending the game. Please click the last button to mark the game as received, when it arrives`,
                                                
                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [item[5]]:
  
                                                        {
                                            [item[3]]: {
                                                            sentGame:true,
                                                            message:`Thanks For sending the game. Waiting on item ${item[0].name} to send ${item[0].trading.name}`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markSent2(item){
    console.log(item,"item")
    if(item[1].sentGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [item[5]]:
                                                            
                                                          {
                                                            stage:3,
                                              [item[3]]: {  
                                                              sentGame:true,
                                                              message:`Thanks For sending the game. Please click the last button to mark the game as received, when it arrives`,
  
                                                                                                          },
                                              [item[2]]:{
                                                message:`Thanks For sending the game. Please click the last button to mark the game as received, when it arrives`,

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [item[5]]:
  
                                                        {
                                            [item[2]]: {
                                                            sentGame:true,
                                                            message:`Thanks For sending the game. Waiting on item ${item[1].name} to send ${item[1].trading.name}`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markReceived(item){
    console.log(item,"item")
    if(item[0].receivedGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [item[5]]:
                                                            
                                                          {
                                                            stage:4,
                                              [item[3]]: {
                                                              receivedGame:true,
                                                              message:`Trade Completed!`,
  
                                                                                                          },
                                              [item[2]]:{

                                                message:`Trade Completed`,

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [item[5]]:
  
                                                        {
                                            [item[3]]: {
                                                            receivedGame:true,
                                                            message:`Thanks! Hope you enjoy your new Game`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markReceived2(item){
    console.log(item,"item")
    if(item[1].receivedGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [item[5]]:
                                                            
                                                          {
                                                            stage:4,
                                              [item[3]]: {

                                                              message:`Trade Completed!`,
  
                                                                                                          },
                                              [item[2]]:{
                                                receivedGame:true,
                                                message:`Trade Completed`

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [item[5]]:
  
                                                        {
                                            [item[2]]: {
                                                            receivedGame:true,
                                                            message:`Thanks! Hope you enjoy your new Game`

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  render() {
    let messages;
    if(this.state.relevantTrades){
    messages = this.state.relevantTrades.map((item,index) => {
      console.log("HIGGHTEM",item)
      if(this.props.userObj.uid == item[3]){
      if(item[4] == 1 && item[1].sentAddress == true){
      return(
      <div className='message-box' key={index}>
      <h5>{item[1].message}</h5>
      </div>
      )
    }
    else if(item[4] == 1){
      return(
        <div className='message-box' key={index}>
        <h5>{item[1].message}</h5>
        <Button className="send-address" color="success" onClick={() => { this.toggleNested(item) }}>Send Address</Button>
        </div>
        )
      }else if(item[4] == 2 && item[1].sentGame == true){
        return(
        <div key={index} className='stage-2-box'>
        <div className='words-box' key={index}>
        <h5>{item[1].message}</h5>
        </div>
        </div>
        )
      }else if(item[4] == 2){
        return(
        <div key={index} className='stage-2-box'>
        <div className='words-box' key={index}>
        <h5>{item[1].message}</h5>
        </div>
        <div className='address-box'>
          {item[0].addressInfo.line1}<br />
          {item[0].addressInfo.line2}<br />
          {item[0].addressInfo.line3}
        </div>
        <Button className="sent-game" color="success" onClick={() => { this.markSent(item) }}>Sent</Button>

        </div>
        )
      }else if(item[4] == 3 && item[1].receivedGame == true){
        return(
        <div className='message-box' key={index}>
        <h5>{item[1].message}</h5>
        </div>
        )
      }
      else if(item[4] == 3){
        return(
          <div className='message-box' key={index}>
          <h5>{item[1].message}</h5>
          <Button className="send-address" color="success" onClick={() => { this.markReceived(item) }}>Received</Button>
          </div>
          )
        }else{ return(
          <div className='message-box' key={index}>
          <h5>{item[0].message}</h5>
          </div>
          )}
    }else if(this.props.userObj.uid == item[2]){
      console.log("address sent")
      if(item[4] == 1 && item[0].sentAddress == true){
        return(
        <div className='message-box' key={index}>
        <h5>{item[0].message}</h5>
        </div>
        )
      }
      else if(item[4] == 1){
        return(
          <div className='message-box' key={index}>
          <h5>{item[0].message}</h5>
          <Button className="send-address" color="success" onClick={() => { this.toggleNested(item) }}>Send Address</Button>
          </div>
          )
        }else if(item[4] == 2 && item[0].sentGame == true){
          return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[0].message}</h5>
          </div>
          </div>
          )
        }else if(item[4] == 2){
          return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[0].message}</h5>
          </div>
          <div className='address-box'>
            {item[1].addressInfo.line1}<br />
            {item[1].addressInfo.line2}<br />
            {item[1].addressInfo.line3}
          </div>
          <Button className="sent-game" color="success" onClick={() => { this.markSent2(item) }}>Sent</Button>
  
          </div>
          )
        }else if(item[4] == 3 && item[0].receivedGame == true){
          return(
          <div className='message-box' key={index}>
          <h5>{item[0].message}</h5>
          </div>
          )
        }
        else if(item[4] == 3){
          return(
            <div className='message-box' key={index}>
            <h5>{item[0].message}</h5>
            <Button className="send-address" color="success" onClick={() => { this.markReceived2(item) }}>Received</Button>
            </div>
            )
          }else{
            return(
              <div className='message-box' key={index}>
              <h5>{item[0].message}</h5>
              </div>
              )
          }


    }})
    console.log("statemessage",this.state.relevantTrades);
    console.log("messages",messages);
  }else{
    messages = 'You have no trades underway. First send or accept a proposal'
  }

    return (
      <div>
      <Button color="primary" onClick={() => { this.checkOngoingTrades() }} >Trades Underway</Button>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Trades Underway</ModalHeader>
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