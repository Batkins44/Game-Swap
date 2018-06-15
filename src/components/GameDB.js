import { rebase } from './Base.js';

export function addWant(game,userObj){
    if(userObj.name){
      return rebase.initializedApp.database().ref().child(`wants/${userObj.uid}/${game.name}`)
        .update(game)
        .then(() => {
          return game;
        })
  }else{
    window.alert('Please Login to start adding Games to you Want and Have lists');
  }
  
  }

  export function addHave(game,userObj){
    if(userObj.name){
      return rebase.initializedApp.database().ref().child(`haves/${userObj.uid}/${game.name}`)
        .update(game)
        .then(() => {
          return game;
        })
  }else{
    window.alert('Please Login to start adding Games to you Want and Have lists');
  }
  
  }