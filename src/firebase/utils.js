import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
<<<<<<< HEAD
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
=======
import { onAuthStateChanged, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut  } from "firebase/auth";
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
import { getData, writeUserData, removeData, } from "./database";

const app = initializeApp(firebaseConfig)

const auth = getAuth();

function onAuth(setUserProfile, setUserData) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserProfile(user)
      // getData(setUserData)
    } else {
      setUserProfile(user)
      // getData(setUserData)
    }
  });
}

// ---------------------------Login, Sign Up and Sign In------------------------------------

<<<<<<< HEAD
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
=======
function signUpWithEmail (email, password, setUserProfile) {
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(user)

    // Signed in
    const user = userCredential.user;
    console.log(user)
    setUserProfile(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..

    console.log(error)
  });
}

async function signInWithEmail (email, password, setUserProfile) {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    setUserProfile(res.user)
    return res.user
  } catch (error) {
    setUserProfile(null)
    return null  }
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
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
<<<<<<< HEAD
    console.log('logout')
  }).catch((error) => {
    // An error happened.
  });
=======
  console.log('logout')
}).catch((error) => {
  // An error happened.
});
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
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