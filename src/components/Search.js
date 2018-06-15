import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button
 } from 'reactstrap';

 import { rebase } from './Base.js';

 import './Search.css'

 import { API_KEY,proxyUrl } from './Api.js';




export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false,
      searchLoaded:false
    };


  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

    searchGames(entry){
      let component = this;
      fetch(proxyUrl + `http://www.giantbomb.com/api/search/?api_key=${API_KEY}&format=json&query=${entry}&resources=game&limit=100`)
      .then((resp) => resp.json())
      .then(function(data){
        console.log("search results", data);
        console.log("data:",data);
        console.log("compprops",component.props);
        component.setState({
          searchLoaded:true,
          data:data.results
          
        })
        component.props.search(data.results)
      }
    )

  }

  addGames(game){
    console.log("addGame", game);
    return rebase.initializedApp.database().ref().child(`popular/${game.id}`)
      .update(game)
      .then(() => {
        return game;
      })
  }


  render() {
    console.log("MY STATE BABY",this.state);
    return (
      <div id='search'>
        <InputGroup>
          <Input id='search-entry' placeholder="Search Games" />
          <InputGroupAddon addonType="append"><Button onClick={() => { this.searchGames(document.getElementById('search-entry').value) }} color="primary">Search</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );


  }
}