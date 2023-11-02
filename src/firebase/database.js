import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config'
import { getDatabase, ref, onValue, set, child, get, remove, update } from "firebase/database";

const app = initializeApp(firebaseConfig)
const db = getDatabase(app);
const dbRef = ref(getDatabase());

// -------------------------------Firebase Realtime Database------------------------------------

function getData(setUserData) {
  onValue(ref(db, '/'), (snapshot) => {
    if (snapshot.exists()) {
      setUserData(snapshot.val());
    }
  });
}

async function getSpecificData(query, setUserSpecificData, callback) {
  try {
    const snapshot = await get(child(dbRef, `${query}`))
    console.log(snapshot.exists())
    if (snapshot.exists()) {
      setUserSpecificData(snapshot.val())
      callback && callback !== undefined ? callback() : ''
      return snapshot.val()
    } else {
      callback && callback !== undefined ? callback() : ''
      return null
    }
  } catch (error) {
    console.error(error);
  }
}

function writeUserData(rute, object, setUserSuccess, callback) {
  console.log(rute)
  update(ref(db, rute), object)
    .then(() => {
      setUserSuccess !== null ? setUserSuccess('save') : ''
      callback !== null ? callback() : ''
    })
    .catch((err) => console.log(err))
}

async function removeData(rute, setUserSuccess) {
  await remove(ref(db, rute)).then(() => setUserSuccess('save')).catch(() => setUserSuccess('repeat'));
}


export { getData, writeUserData, removeData, getSpecificData }