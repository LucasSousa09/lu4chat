import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  databaseURL: "https://lu4chat-default-rtdb.firebaseio.com/",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const database = getDatabase(app)

export { app, database, db }