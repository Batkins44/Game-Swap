import React from 'react';
import { Button } from 'reactstrap';
import App from '../App';
import './SearchResults.css';




export default class SearchResults extends React.Component {

  constructor(props) {
    super(props);



    

    // this.getUserData = this.getUserData.bind(this);    
       
  }


  render() {
    console.log('gimmealltheprops',this.props);
    if(this.props.searchResults){
      const searchResults = this.props.searchResults.map((item,index) => {
        if (item.platforms){
        let platformArray = [];
        console.log(item.platforms,"thisthelength")
        for(let i=0;i<item.platforms.length;i++){
          let currentSearch = item.platforms[i].name;
          platformArray.push(currentSearch);
        }if(platformArray.includes("Nintendo Switch") || platformArray.includes("Xbox 360") || platformArray.includes("Xbox One") || platformArray.includes("Nintendo Switch") || platformArray.includes("PlayStation 3") || platformArray.includes("PlayStation 4")){
        return(
        <div>
        <img src={item.image.thumb_url} />
        {item.name}
        </div>
        )}}
      })

return (
  <div id="search-results">
  <hr />
{searchResults}
</div>
)

    }else{
return(
<div>
<p>To start, click the appropriate 'W' for Want List or 'H' for the Have List. Hint: If there is a 'View Profile' Button, it means that another user is trying to trade that game to someone.</p>

</div>
)}
  }}