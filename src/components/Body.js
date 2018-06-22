import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Body.css';

import { API_KEY,proxyUrl } from './Api.js';
import SearchResults from './SearchResults';

import Bodygames from './Bodygames';

export default class Body extends React.Component {


  render() {
    return (
        <div id='body-container'>

            <div id='center-grid'>
            <h1 className='left-logo'>Game</h1><h1 className='red-logo'>Swap</h1>

            </div>



              <SearchResults searchResults={this.props.searchResults} userObj={this.props.userObj} />




            <div>
            <Bodygames userObject={this.props.userObj} />

            </div>

        </div>
    );
  }
}