import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
import { getDatabase, ref, onValue, set, child, get, remove, update } from "firebase/database";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
const dbRef = ref(getDatabase());


// // -------------------------------Firebase Realtime Database------------------------------------


function getData(setUserData) {
  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
      setUserData(snapshot.val());
    }
  });
}

async function getSpecificData(query, setUserSpecificData) {
  try {
    const snapshot = await get(child(dbRef, `${query}`))

<<<<<<< HEAD
    console.log(snapshot.exists())

    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val())
      console.log(snapshot.val())

=======
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val())
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
      return snapshot.val()
    } else {
      return null
    }

  } catch (error) {
    console.error(error);
  }
}

function writeUserData(rute, object, setUserSuccess) {
  console.log(rute)
  update(ref(db, rute), object)
    .then(() => setUserSuccess !== null ? setUserSuccess('save') : '')
<<<<<<< HEAD
    .catch((err) => console.log(err))
=======
    .catch(() => setUserSuccess('repeat'))
>>>>>>> 8ef581cdda53cf380dceb7ba3c7a754c490b107d
}

async function removeData(rute, setUserSuccess) {
  await remove(ref(db, rute)).then(() => setUserSuccess('save')).catch(() => setUserSuccess('repeat'));
  // getData(setUserData)
}


export { getData, writeUserData, removeData, getSpecificData }