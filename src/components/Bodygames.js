import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Bodygames.css';

import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import { API_KEY,proxyUrl } from './Api.js';

import { rebase } from './Base.js';


export default class Bodygames extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        bodyimgloaded:false,
        data:null
    }

  }

  componentDidMount(){
    let component = this
    let bodyGameArray = []
    let bodyGameContent = []

    rebase.fetch('popular', {
      context: this,
      asArray: true,
      then(data){
        console.log(data);
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
        console.log("bodygame array",bodyGameArray);
        console.log("bodygame content",bodyGameContent);
        component.setState({
          bodyimgloaded:true,
          data:bodyGameContent
          
        });
      }
    });

}

addHave = (game) => {
if(this.props.userObject.name){
    return rebase.initializedApp.database().ref().child(`haves/${this.props.userObject.uid}/${game.name}`)
      .update(game)
      .then(() => {
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
    console.log(this.state,"heres the state");
    if(this.state.bodyimgloaded === false){
    return (
        <div id='body-games'>
        <hr />
        Loading...
        
        </div>
    );
  }else{

return(
<div>
<h2>Popular Games</h2>
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





  </div>
)}
  }
}