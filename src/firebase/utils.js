import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'

import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { getData, writeUserData, removeData, } from "./database";

const app = initializeApp(firebaseConfig)

const auth = getAuth();

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      // getData(setUserData)
    } else {
      setUserProfile(null)
      setUserData(null)
      // getData(setUserData)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------


async function signUpWithEmail(email, password, setUserProfile) {
  try {

    const res = await createUserWithEmailAndPassword(auth, email, password)

    const user = res.user;
    setUserProfile(user)
    return res.user
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return null
  }

}

async function signInWithEmail(email, password, setUserProfile) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    setUserProfile(res.user)
    return res.user
  } catch (error) {
    setUserProfile(null)
    return null
  }
}

function handleSignOut() {
  signOut(auth).then(() => {

    console.log('logout')
  }).catch((error) => {
    // An error happened.
  });

}


export { onAuth, signUpWithEmail, signInWithEmail, handleSignOut }








  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;

  //   setUserProfile(user)
  //   //  userProfile = user
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   console.log(error)

  //   // setUserSuccess(false)
  // });

  // return console.log(userProfile)