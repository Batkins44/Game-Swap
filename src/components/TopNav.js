import React from 'react';
import './TopNav.css';
import Matches from './Matches';
import Lists from './Lists';


export default class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userObj:this.props.userObj.uid
        }

      }






render() {
  console.log("BADASS PROPS",this.props)
    return(
        <div id='top-nav'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

        <div>
          <ul className="navbar-nav">
            <Lists userObj={this.props.userObj} />
            <li className="nav-item">
              <a className="nav-link" >Proposals Received</a>
            </li>
            <Matches userObj={this.props.userObj} />
          </ul>
        </div>
      </nav>
      </div>
    )
}

}