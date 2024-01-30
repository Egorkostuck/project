import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCUvVj4EB11uBN4TIckpPiCF1ZCmGi1C_E',
  authDomain: 'project-frontandiya.firebaseapp.com',
  projectId: 'project-frontandiya',
  storageBucket: 'project-frontandiya.appspot.com',
  messagingSenderId: '599415303666',
  appId: '1:599415303666:web:7474d7dff9678165db8f6b',
  measurementId: 'G-NHQCP1VCLQ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

const delay = 500;
const color = 3;

export { auth, provider, db, delay, color };
