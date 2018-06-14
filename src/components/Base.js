import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey:  "AIzaSyC_psFveUA6VkGFA1I_ulr1gK2RGpR18Y4",
    authDomain: "game-swap-94ddc.firebaseapp.com",
    databaseURL: "https://game-swap-94ddc.firebaseio.com"
}


const app = firebase.initializeApp(config)

export const user = firebase.auth().currentUser;

export const rebase = Rebase.createClass(app.database());

export const googleProvider = new firebase.auth.GoogleAuthProvider();

