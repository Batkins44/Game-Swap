import React from 'react';
import { Jumbotron, Container } from 'reactstrap';
import Search from './Search';

import './Billboard.css'

export default class TopNav extends React.Component {


    render(){
        return(
            <div>
            <Jumbotron fluid>
            <Container fluid>
              <h1 className="display-3">Have Old Games Sitting Around?</h1>
              <p className="lead">Get the most out of them by trading with other gamers here!</p>
              <Search />
            </Container>
          </Jumbotron>
            </div>
        )
    }
}