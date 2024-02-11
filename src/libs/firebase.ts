import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBdIoMH7KLS6BOg8L-9be3Ch3AacGTqHhU",
  authDomain: "lu4chat.firebaseapp.com",
  projectId: "lu4chat",
  databaseURL: "https://lu4chat-default-rtdb.firebaseio.com/",
  storageBucket: "lu4chat.appspot.com",
  messagingSenderId: "633966148045",
  appId: "1:633966148045:web:efc6bd288d7c1b8158ac84"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const database = getDatabase(app)

export { app, database, db }