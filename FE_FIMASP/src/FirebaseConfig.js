import { initializeApp  } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDBZPiJQc8idolHl4SxwutTdBjpXpcbb1M",
    authDomain: "products-54a8e.firebaseapp.com",
    projectId: "products-54a8e",
    storageBucket: "products-54a8e.appspot.com",
    messagingSenderId: "805822667025",
    appId: "1:805822667025:web:166b4213e774050b7e14b0",
    measurementId: "G-KVKEMHXZVC"
};

initializeApp(firebaseConfig);

const storage = getStorage()
export default storage;