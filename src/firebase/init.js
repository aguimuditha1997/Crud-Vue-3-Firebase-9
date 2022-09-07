import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";



const firebaseConfig = {
  apiKey: "AIzaSyCgUc80vOAS9EEHmE0kLaWyTAhn94rFXLI",
  authDomain: "aguiproject-74792.firebaseapp.com",
  projectId: "aguiproject-74792",
  storageBucket: "aguiproject-74792.appspot.com",
  messagingSenderId: "150263263122",
  appId: "1:150263263122:web:7c0304106846ccd7605b4b"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}