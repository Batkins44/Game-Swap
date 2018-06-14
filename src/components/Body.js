import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Body.css';

import { API_KEY,proxyUrl } from './Api.js';

import Bodygames from './Bodygames';

export default class Body extends React.Component {


  render() {
    return (
        <div id='body-container'>
            <div id='left-grid'>
            <h3>Trading Block</h3>            
            </div>
            <div id='center-grid'>
            <h1>GameSwap</h1>

            </div>
            <div id='right-grid'>
            <h3>Most Active Members</h3>

            </div>
            <div>
            <h3>Trades up for grabs will be shown below</h3>            
            </div>
            <div>
            <p>To start, click the appropriate 'W' for Want List or 'H' for the Have List. Hint: If there is a 'View Profile' Button, it means that another user is trying to trade that game to someone.</p>

            </div>
            <div>
            <h3>Most active members will be shown here</h3>

            </div>
            <div>
            <h3>-----------------------------------------</h3>            
            </div>
            <div>
            <Bodygames />

            </div>
            <div>
            <h3>-------------------------------------------</h3>

            </div>
        </div>
    );
  }
}