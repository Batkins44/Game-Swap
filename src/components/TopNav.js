import React from 'react';
import './TopNav.css';


export default class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userObj:this.props.userObj.uid
        }

      }






render() {
    return(
        <div id='top-nav'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" >My Lists <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" >Current Requests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" >See Matches</a>
            </li>
          </ul>
        </div>
      </nav>
      </div>
    )
}

}