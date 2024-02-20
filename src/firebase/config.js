import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgeOSS0X46FinFYFuMM4SthjF2oV2_rGA",
  authDomain: "react-blog-ec965.firebaseapp.com",
  projectId: "react-blog-ec965",
  storageBucket: "react-blog-ec965.appspot.com",
  messagingSenderId: "640994262438",
  appId: "1:640994262438:web:c71acaa11598fbe7dd2367",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
