import React from 'react';
import { Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { rebase } from './Base.js'

import './TradesUnderway.css'

let itemObj={};

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

  toggleNested(item,userIndex) {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false,
      clickedItem: item,
      userIndex:userIndex
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }

  sendAddress(name,address,city,state,zip,itemObj){
    this.toggleAll()
    console.log("====================",name,address,city,state,zip,itemObj)
    let yourAddressInfo = {
      line1:name,
      line2:address,
      line3:city + "," + state + " " + zip
    }

    itemObj.otherInfo.addressInfo = yourAddressInfo
  this.setState({
    acceptedTrades:
    
    
                                                          {

            [itemObj.key]:

                                                      {
                                                        
                                                        stage:2,
                                                        [itemObj.otherUid]: {
                                                          message:`Please send ${itemObj.yourInfo.trading.name} to ${itemObj.otherInfo.name} as soon as possible, then mark it as sent with the button`,
                                                          addressInfo:{
                                                            line1:name,
                                                            line2:address,
                                                            line3:city + "," + state + " " + zip
                                                                      }
                                                                                              },
                                                              [itemObj.yourUid]: {
                                                          sentAddress:true,
                                                          message:`Please send ${itemObj.otherInfo.trading.name} to ${itemObj.yourInfo.name} as soon as possible, then mark it as sent with the button`,

                                                                                                      }
                                                    }
                                                          }


   }) }
  

  checkOngoingTrades(){
      console.log("yep",this.state.acceptedTrades)
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
        }}
      )
      this.setState({
        modal: !this.state.modal
      });
  }

  markSent(item){
    console.log(item,"item")
    this.toggle();
    if(itemObj.otherInfo.sentGame == true || itemObj.otherInfo.sentGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [itemObj.key]:
                                                            
                                                          {
                                                            stage:3,
                                              [itemObj.yourUid]: {
                                                sentGame:true,
                                                message:`Thanks For sending the game. Please click the button to mark the game as received, when it arrives`,
                                                                                                          },
                                              [itemObj.otherUid]:{
                                                message:`Thanks For sending the game. Please click the button to mark the game as received, when it arrives`,
                                                sentGame:true

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [itemObj.key]:
  
                                                        {
                                            [this.props.userObj.uid]: {
                                                            sentGame:true,
                                                            message:`Thanks For sending the game. Waiting on ${itemObj.otherInfo.name} to send ${itemObj.otherInfo.receiving.name}`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markSent2(item){
    this.toggle()
    console.log(item,"item");

    if(itemObj.otherInfo.sentGame == true || itemObj.otherInfo.sentGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [itemObj.key]:
                                                            
                                                          {
                                                            stage:3,
                                              [itemObj.otherUid]: {
                                                            sentGame:true,
                                                              message:`Thanks For sending the game. Please click the button to mark the game as received, when it arrives`,
                                                                                                          },
                                              [itemObj.yourUid]:{
                                                message:`Thanks For sending the game. Please click the button to mark the game as received, when it arrives`,
                                                sentGame:true

                                                
                                              }
                                                        }
                                                              }
    
    
       })
    }else
    {
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [itemObj.key]:
  
                                                        {
                                            [this.props.userObj.uid]: {
                                                            sentGame:true,
                                                            message:`Thanks For sending the game. Waiting on ${itemObj.otherInfo.name} to send ${itemObj.otherInfo.trading.name}`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markReceived(item){
    this.toggle();
    console.log(item,"item")
    if(itemObj.otherInfo.receivedGame == true || itemObj.yourInfo.receivedGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [itemObj.key]:
                                                            
                                                          {
                                                            stage:4,
                                              [itemObj.yourUid]: {
                                                              receivedGame:true,
                                                              message:`Trade Completed!`,
  
                                                                                                          },
                                              [itemObj.otherUid]:{
                                                receivedGame:true,
                                                message:`Trade Completed`,

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [itemObj.key]:
  
                                                        {
                                            [this.props.userObj.uid]: {
                                                            receivedGame:true,
                                                            message:`Thanks! Hope you enjoy your new Game`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  markReceived2(item){
    this.toggle();
    console.log(item,"item")
    if(itemObj.otherInfo.receivedGame == true || itemObj.yourInfo.receivedGame == true){
      this.setState({
        acceptedTrades:
        
        
                                                              {
    
                [itemObj.key]:
                                                            
                                                          {
                                                            stage:4,
                                              [itemObj.yourUid]: {
                                                receivedGame:true,
                                                message:`Trade Completed!`,
  
                                                                                                          },
                                              [itemObj.otherUid]:{
                                                receivedGame:true,
                                                message:`Trade Completed`,

                                              }
                                                        }
                                                              }
    
    
       })
    }else{
    this.setState({
      acceptedTrades:
      
      
                                                            {
  
              [itemObj.key]:
  
                                                        {
                                            [itemObj.yourUid]: {
                                                            receivedGame:true,
                                                            message:`Thanks! Hope you enjoy your new Game`,

                                                                                                        }
                                                      }
                                                            }
  
  
     })}
  }

  render() {
    console.log("MISSS STATE",this.state,"itemObj",itemObj);
    let messages;
    let userType;
    let userIndex;
    if(this.state.relevantTrades && this.props.userObj.uid){
    messages = this.state.relevantTrades.map((item,index) => {
      console.log("HIGGHTEM",item)
      for(let i=0;i<item.length;i++){
       let current = item[i];
       if(current.uid){
        if(current.uid == this.props.userObj.uid){
          userIndex=i;
        }
       }
      }
      console.log("THISTHEITEMNOOOW",userIndex,item[userIndex])

      if(userIndex == 0){
      itemObj.yourInfo = item[0];
      itemObj.otherInfo = item[1];
      itemObj.yourUid = item[2];
      itemObj.otherUid=item[3];
      itemObj.stage=item[4];
      itemObj.key=item[5];
      itemObj.userIndex=0;
      itemObj.otherIndex=1;
      }else if(userIndex == 1){
        itemObj.yourInfo = item[1];
        itemObj.otherInfo = item[0];
        itemObj.yourUid = item[2];
        itemObj.otherUid=item[3];
        itemObj.stage=item[4];
        itemObj.key=item[5];
        itemObj.userIndex=0;
        itemObj.otherIndex=1;
      }
      console.log(itemObj,"itemObj")

      if(item[userIndex]){
      if(item[userIndex].proposed == false){
      if(item[4] == 1 && item[userIndex].sentAddress == true){
      return(
      <div className='message-box' key={index}>
      <h5>{item[userIndex].message}</h5>
      </div>
      )
    }
    else if(item[4] == 1){
      return(
        <div className='message-box' key={index}>
        <h5>{item[userIndex].message}</h5>
        <Button className="send-address" color="success" onClick={() => { this.toggleNested(item,userIndex) }}>Send Address</Button>
        </div>
        )
      }else if(item[4] == 2 && item[userIndex].sentGame == true){
        return(
        <div key={index} className='stage-2-box'>
        <div className='words-box' key={index}>
        <h5>{item[userIndex].message}</h5>
        </div>
        </div>
        )
      }else if(item[4] == 2 && itemObj.otherInfo.addressInfo){
        return(
        <div key={index} className='stage-2-box'>
        <div className='words-box' key={index}>
        <h5>{item[userIndex].message}</h5>
        </div>
        <div className='address-box'>
          {itemObj.otherInfo.addressInfo.line1}<br />
          {itemObj.otherInfo.addressInfo.line2}<br />
          {itemObj.otherInfo.addressInfo.line3}
        </div>
        <Button className="sent-game" color="success" onClick={() => { this.markSent(item) }}>Sent</Button>

        </div>
        )
      }else if(item[4] == 2){
        return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          <div className='address-box'>
Loading
          </div>  
          </div>
          )
      }else if(item[4] == 3 && item[userIndex].receivedGame == true){
        return(
        <div className='message-box' key={index}>
        <h5>{item[userIndex].message}</h5>
        </div>
        )
      }
      else if(item[4] == 3){
        return(
          <div className='message-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          <Button className="send-address" color="success" onClick={() => { this.markReceived(item) }}>Received</Button>
          </div>
          )
        }else{ return(
          <div className='message-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          )}
    }else if(item[userIndex].proposed == true){
      console.log("address sent")
      if(item[4] == 1 && item[userIndex].sentAddress == true){
        return(
        <div className='message-box' key={index}>
        <h5>{item[userIndex].message}</h5>
        </div>
        )
      }
      else if(item[4] == 1){
        return(
          <div className='message-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          <Button className="send-address" color="success" onClick={() => { this.toggleNested(item) }}>Send Address</Button>
          </div>
          )
        }else if(item[4] == 2 && item[userIndex].sentGame == true){
          return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          </div>
          )
        }else if(item[4] == 2 && itemObj.yourInfo.addressInfo){
          return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          <div className='address-box'>
          {itemObj.otherInfo.addressInfo.line1}<br />
          {itemObj.otherInfo.addressInfo.line2}<br />
          {itemObj.otherInfo.addressInfo.line3}
          </div>
          <Button className="sent-game" color="success" onClick={() => { this.markSent2(item) }}>Sent</Button>
  
          </div>
          )
        }else if(item[4] == 2){
          return(
          <div key={index} className='stage-2-box'>
          <div className='words-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          <div className='address-box'>
            Loading
          </div>
  
          </div>
          )
        }
        else if(item[4] == 3 && item[userIndex].receivedGame == true){
          return(
          <div className='message-box' key={index}>
          <h5>{item[userIndex].message}</h5>
          </div>
          )
        }
        else if(item[4] == 3){
          return(
            <div className='message-box' key={index}>
            <h5>{item[userIndex].message}</h5>
            <Button className="send-address" color="success" onClick={() => { this.markReceived2(item) }}>Received</Button>
            </div>
            )
          }else{
            return(
              <div className='message-box' key={index}>
              <h5>{item[userIndex].message}</h5>
              </div>
              )
          }


    }}})
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
              
                  <Button onClick={() => { this.sendAddress(document.getElementById('addressName').value,document.getElementById('street-address').value,document.getElementById('city-address').value,document.getElementById('state-address').value,document.getElementById('zip-address').value,itemObj) }} color='success'>Accept</Button>
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