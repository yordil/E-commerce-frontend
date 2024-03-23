import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
	apiKey: "AIzaSyAzcedpesn5tonJ8z4lviWMHnu4pn1Rv6k",
	authDomain: "clone-6a383.firebaseapp.com",
	projectId: "clone-6a383",
	storageBucket: "clone-6a383.appspot.com",
	messagingSenderId: "175963419403",
	appId: "1:175963419403:web:3234792390650719ca680e",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = app.firestore();
