
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Router } from 'react-router';

import { rebase } from './Base.js';
import './Lists.css'

export default class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      listsLoaded:false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleClick = this.toggleClick.bind(this);
  }

  toggleClick() {
    let component = this
    let havesArray = [];
    let wantsArray = [];
    console.log(component.props,"heyclickprops")
    if(component.props.userObj.name){
    rebase.fetch(`haves/${component.props.userObj.uid}`, {
        context: this,
        asArray: true,
        then(data){
          console.log(data);
          component.setState({
            haves:data
            
          });
        }
      }).then(
        rebase.fetch(`wants/${component.props.userObj.uid}`, {
            context: this,
            asArray: true,
            then(data){
              console.log(data);
              component.setState({
                modal: !this.state.modal,
                wants:data,
                listsLoaded:true

                
              });
            }
          })
      )
  }else{
      window.alert("Please Login");
  }}

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  deleteWant(game){
    rebase.remove(`wants/${this.props.userObj.uid}/${game.name}`);
  }

  deleteHave(game){
   rebase.remove(`haves/${this.props.userObj.uid}/${game.name}`);
  }

  render() {
if(this.state.listsLoaded){

    const want = this.state.wants.map((item,index) => {
        return(
            <div className='list-games'>
            
            <img src={item.image.thumb_url} />
            {item.name}
            <Button onClick={() => { this.deleteWant(item) }} color="danger">Delete</Button>
            </div>

    )})
        
    const have = this.state.haves.map((item,index) => {
        return(

            <div className='list-games'>

            <img src={item.image.thumb_url} />
            {item.name}
            <Button onClick={() => { this.deleteHave(item) }} color="danger">Delete</Button>
            </div>
        


    )})
    return (
      <div>
        <Button color="primary" onClick={this.toggleClick}>My Lists</Button>
        <Modal id='lists-modal' size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Lists</ModalHeader>
          <ModalBody >
          <div className="container-fluid">
          <div className="row">
            <div id='wants-list' className="col-md-6"><h1>Wants</h1><ul>{want}</ul></div>
            <div id='haves-list' className="col-md-6"><h1>Haves</h1><ul>{have}</ul></div>
          </div>
          
        </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }else{
     return (
        <div>
        <Button color="primary" onClick={this.toggleClick}>My Lists</Button>
        <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Lists</ModalHeader>
          <ModalBody>
            Loading...
          </ModalBody>
        </Modal>
      </div>
     )}}}
