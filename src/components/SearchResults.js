import React from 'react';
import { Button } from 'reactstrap';
import App from '../App';
import './Login.css';




export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);



    

    // this.getUserData = this.getUserData.bind(this);    
       
  }


  render() {
    console.log('gimmealltheprops',this.props);
    if(this.props.searchResults){

return (
  <div>
Search
</div>
)

    }else{
return(
<div>
<p>To start, click the appropriate 'W' for Want List or 'H' for the Have List. Hint: If there is a 'View Profile' Button, it means that another user is trying to trade that game to someone.</p>

</div>
)}
  }}