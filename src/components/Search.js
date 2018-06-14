import React from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
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
        component.setState({
          searchLoaded:true,
          data:data.results
          
        });
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
    if(this.state.searchLoaded === false){
    return (
      <div id='search'>
        <InputGroup>
          <Input id='search-entry' placeholder="Search Games" />
          <InputGroupAddon addonType="append"><Button onClick={() => { this.searchGames(document.getElementById('search-entry').value) }} color="primary">Search</Button></InputGroupAddon>
        </InputGroup>
      </div>
    );

  }else{
    const searchResults = this.state.data.map((item,index) => {
      return(
        <li key={index}>
        {item.name} {item.original_release_date}
        <br />
        <a onClick={() => { this.addGames(item) }} color="primary">Add</a>
        </li>
      )
  })
  return(
    <div id='search'>
    <InputGroup>
      <Input id='search-entry' placeholder="Search Games" />
      <InputGroupAddon addonType="append"><Button onClick={() => { this.searchGames(document.getElementById('search-entry').value) }} color="primary">Search</Button></InputGroupAddon>
    </InputGroup>
  
    <ul>
    {searchResults}
    </ul>
    </div>
  )
  }
  }
}