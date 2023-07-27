// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhYWMVPkDXYIITu0bgWCjsD9yJINmakOs',
  authDomain: 'stories-8989d.firebaseapp.com',
  projectId: 'stories-8989d',
  storageBucket: 'stories-8989d.appspot.com',
  messagingSenderId: '272646886835',
  appId: '1:272646886835:web:d0a4701aa5c5aa2b6f27c6',
  measurementId: 'G-0WMTEXHY53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {
  app, auth, db, storage,
};
