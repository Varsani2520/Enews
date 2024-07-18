

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
// export const firebaseConfig = {
//   apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",

//   authDomain: "enews-22664.firebaseapp.com",

//   projectId: "enews-22664",

//   storageBucket: "enews-22664.appspot.com",

//   messagingSenderId: "983457321300",

//   appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",

//   measurementId: "G-H24LR9S22B",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// const db = getFirestore(app);

// const signInWithGoogle = () => {
//   return signInWithPopup(auth, provider);
// };

// export { auth, signInWithGoogle, db };


import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-LXlcAmBYjSrk3cZyezuhLRhU7Z-kAgE",
  authDomain: "enews-22664.firebaseapp.com",
  projectId: "enews-22664",
  storageBucket: "enews-22664.appspot.com",
  messagingSenderId: "983457321300",
  appId: "1:983457321300:web:7572961ddaebc2bdbc38c1",
  measurementId: "G-H24LR9S22B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export { app, auth, db, provider };
