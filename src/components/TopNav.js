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
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <Lists userObj={this.props.userObj} />
            <li className="nav-item">
              <a className="nav-link" >Current Requests</a>
            </li>
            <Matches userObj={this.props.userObj} />
          </ul>
        </div>
      </nav>
      </div>
    )
}

}