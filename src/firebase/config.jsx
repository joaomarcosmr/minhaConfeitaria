  import { initializeApp } from 'firebase/app';
  import { getFirestore } from "firebase/firestore";
  import { getAuth } from 'firebase/auth';

  const firebaseConfig = {
    apiKey: "AIzaSyDRfuw3B82GrX6ZO_9Vx7F_TJg1rn_SgmM",
    authDomain: "minha-confeitaria-95722.firebaseapp.com",
    projectId: "minha-confeitaria-95722",
    storageBucket: "minha-confeitaria-95722.appspot.com",
    messagingSenderId: "1041254229175",
    appId: "1:1041254229175:web:398e723b34c56a593e1932"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)


  export { db }