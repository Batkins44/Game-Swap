import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import App from '../App';
import './SearchResults.css';
import { rebase } from './Base.js';
import { addWant,addHave } from './GameDB';




export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);

       
  }

  toggleGame(game) {
    console.log(game,'gimmethatgame');
    this.setState({
      modal: !this.state.modal,
      ModalGameName:game.name,
      ModalGameImg:game.image.small_url,
      ModalGameDeck:game.deck,
      ModalGame:game
    });
  }

  toggle() {

    this.setState({
      modal: !this.state.modal,
    });
  }

  // addHave = (game) => {
  //   console.log('addhaveprops',this.props);
  //   if(this.props.userObj.name){
  //       return rebase.initializedApp.database().ref().child(`haves/${this.props.userObj.uid}/${game.name}`)
  //         .update(game)
  //         .then(() => {
  //           return game;
  //         })
  //   }else{
  //     window.alert('Please Login to start adding Games to you Want and Have lists');
  //   }
    
  //     }


  render() {
    console.log('gimmealltheprops',this.props,'gimmeallthestates',this.state);
    let game;
    if(this.props.searchResults){
      const searchResults = this.props.searchResults.map((item,index) => {
       
        return(
        <div className="search-grid-box">
        <div className='search-grid-pic'>
        <img className="search-result-img" src={item.image.thumb_url} onClick={() => { this.toggleGame(item) }} />
        </div>
        <div className="search-grid-name">

        {item.name}
        </div>
        <div className='search-have-want-buttons'>
        <Button onClick={() => { addWant(item,this.props.userObj) }} color="primary">Want</Button>
        <Button onClick={() => { addHave(item,this.props.userObj) }} color="warning">Have</Button>
        </div>
        </div>
        )
      })

return (
  <div id="search-results">
{searchResults}
<Modal size='lg' isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
<ModalHeader toggle={this.toggle}>{this.state.ModalGameName}</ModalHeader>
<ModalBody>

<div id='game-grid'>
<div className='game-preview-img'>
<img  src={this.state.ModalGameImg} />
</div>
<div className='game-preview-deck'>
{this.state.ModalGameDeck}
<div className='have-want-buttons'>
<Button color="primary" onClick={() => { addWant(this.state.ModalGame,this.props.userObj) }}>Want</Button>{' '}
<Button color="warning" onClick={() => { addHave(this.state.ModalGame,this.props.userObj) }}>Have</Button>{' '}
</div>
</div>
</div>

</ModalBody>

</Modal>
</div>
)

    }else{
return(
<div>
<p>To start, click the appropriate button to add games to your "Want" and "Have" List. Hint: If there is a 'View Profile' Button, it means that another user is trying to trade that game to someone.</p>

</div>
)}
  }}