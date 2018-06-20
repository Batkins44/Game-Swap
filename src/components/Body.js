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
            <div id='left-grid' className='trade-block'>
            <h3>Trading Block</h3>            
            </div>
            <div id='center-grid'>
            <h1>GameSwap</h1>

            </div>
            <div id='right-grid' className='active-members'>
            <h3>Most Active Members</h3>

            </div>
            <div className='trade-block'>
            <h3>Trades up for grabs will be shown below</h3>            
            </div>

              <SearchResults searchResults={this.props.searchResults} userObj={this.props.userObj} />

            <div className='active-members'>
            <h3>Most active members will be shown here</h3>

            </div>

            <div className='trade-block'>
            <h3>-----------------------------------------</h3>            
            </div>
            <div>
            <Bodygames userObject={this.props.userObj} />

            </div>
            <div className='active-members'>
            <h3>-----------------------------------------</h3>

            </div>
        </div>
    );
  }
}