import { googleProvider, rebase } from './Base.js';

export function auth(email, pw) {
  return rebase.initializedApp.auth().createUserWithEmailAndPassword(email, pw)
    .then((data) => {
      saveUser(data);
    })
}

export function logout() {
  return rebase.initializedApp.auth().signOut()
}


export function loginWithGoogle() {
  return rebase.initializedApp.auth().signInWithPopup(googleProvider)
    .then((data) => {
      saveUser(data.user);
    });
}


export function saveUser(user) {
  return rebase.initializedApp.database().ref().child(`users/${user.uid}`)
    .update({
      email: user.email,
      uid: user.uid,
      photo:user.photoURL,
      name:user.displayName
    })
    .then(() => {
      return user;
    })
}