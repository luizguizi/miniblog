import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCvLcS8rCcTmPCJN513F1WbykaINBzGnME",
  authDomain: "miniblog-57e42.firebaseapp.com",
  projectId: "miniblog-57e42",
  storageBucket: "miniblog-57e42.appspot.com",
  messagingSenderId: "648329488853",
  appId: "1:648329488853:web:edb5228e25d648fed7f55c"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};