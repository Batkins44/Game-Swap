import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Bodygames.css';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup, Label, Input } from 'reactstrap';

import { API_KEY,proxyUrl } from './Api.js';

import { rebase } from './Base.js';


export default class Bodygames extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        bodyimgloaded:false,
        data:null,
        modal: false,
        clickedGame:null,
        
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount(){
    let component = this
    let bodyGameArray = []
    let bodyGameContent = []

    rebase.fetch('popular', {
      context: this,
      asArray: true,
      then(data){
        for(let i=0;i<4;i++){
          let randNum = Math.floor(Math.random() * data.length);  

          while(true){
            if(bodyGameArray.includes(randNum)){
              randNum = Math.floor(Math.random() * data.length)
            }else{
              bodyGameArray.push(randNum);
              bodyGameContent.push(data[randNum])
              break
            }
          }
        }
        component.setState({
          bodyimgloaded:true,
          data:bodyGameContent
          
        });
      }
    });

}

addHave = (game) => {
  let component = this
if(this.props.userObject.name){
    return rebase.initializedApp.database().ref().child(`haves/${this.props.userObject.uid}/${game.name}`)
      .update(game)
      .then(() => {
    const platformSelect = game.platforms.map((item,index) => {
      return(
        <FormGroup check>
        <Label check>
          <Input type="radio" value={item.name} />{' '}
          {item.name}
        </Label>
      </FormGroup>


  )})
        component.setState({
          modal: !this.state.modal,
          platforms:platformSelect
          
        });
        return game;
      })
}else{
  window.alert('Please Login to start adding Games to you Want and Have lists');
}

  }

addWant(game){
  if(this.props.userObject.name){
    return rebase.initializedApp.database().ref().child(`wants/${this.props.userObject.uid}/${game.name}`)
      .update(game)
      .then(() => {
        return game;
      })
}else{
  window.alert('Please Login to start adding Games to you Want and Have lists');
}

}

  render() {
    if(this.state.bodyimgloaded === false){
    return (
        <div id='body-games'>
        <hr />
        Loading...
        
        </div>
    );
  }else{
    console.log("THISMYSTATEBITTTCHH",this.state.clickedGame);
//     if(this.state.clickedGame){
//     const platformSelect = this.state.clickedGame.platforms.map((item,index) => {
//       return(
//         <FormGroup check>
//         <Label check>
//           <Input type="radio" value={item.name} />{' '}
//           {item.name}
//         </Label>
//       </FormGroup>


//   )})
// }

return(
<div>
<h2 id='pop-games'>Popular Games</h2>
  <div id='body-grid'>
  <div className='body-game'>
  <img className='body-img' src={this.state.data[0].image.thumb_url} />
  <b>{this.state.data[0].name}</b>
  <div id='body-buttons-1' className='have-want-buttons'>
  <Button onClick={() => { this.addWant(this.state.data[0]) }} color="primary">Want</Button>
  <Button onClick={() => { this.addHave(this.state.data[0]) }} color="warning">Have</Button>
  </div>
  </div>
  <div className='body-game'>
  <img className='body-img' src={this.state.data[1].image.thumb_url} />
  <b>{this.state.data[1].name}</b>
  <div id='body-buttons-2' className='have-want-buttons'>
  <Button onClick={() => { this.addWant(this.state.data[1]) }} color="primary">Want</Button>
  <Button onClick={() => { this.addHave(this.state.data[1]) }} color="warning">Have</Button>
  </div>
  </div>
  <div className='body-game'>
  <img className='body-img' src={this.state.data[2].image.thumb_url} />
  <b>{this.state.data[2].name}</b>
  <div id='body-buttons-3' className='have-want-buttons'>
  <Button onClick={() => { this.addWant(this.state.data[2]) }} color="primary">Want</Button>
  <Button onClick={() => { this.addHave(this.state.data[2]) }} color="warning">Have</Button>
  </div>
  </div>
  </div>

  <div>
  <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
    <ModalHeader toggle={this.toggle}>Which Platform</ModalHeader>
    <ModalBody>
    Please Select the appropriate Platform
    <br />
    <FormGroup tag="fieldset">
    <legend>Radio Buttons</legend>
    {this.state.platforms}
  </FormGroup>
    </ModalBody>
    <ModalFooter>
      <Button color="primary" onClick={() => { this.toggle() }}>Choose</Button>{' '}
    </ModalFooter>
  </Modal>
</div>



  </div>
)}
  }
}