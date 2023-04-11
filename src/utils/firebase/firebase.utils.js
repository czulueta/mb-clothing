import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider
} from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBI2o5JsRSHsa-Oa9x2RMhXW5jjRLuwGOk",
  authDomain: "mb-clothing-db.firebaseapp.com",
  projectId: "mb-clothing-db",
  storageBucket: "mb-clothing-db.appspot.com",
  messagingSenderId: "175240573725",
  appId: "1:175240573725:web:5499afd2ee33b0b6c2e7f4"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBI2o5JsRSHsa-Oa9x2RMhXW5jjRLuwGOk",
//   authDomain: "mb-clothing-db.firebaseapp.com",
//   projectId: "mb-clothing-db",
//   storageBucket: "mb-clothing-db.appspot.com",
//   messagingSenderId: "175240573725",
//   appId: "1:175240573725:web:672cdd08571ef625c2e7f4"
// };


const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  
  const userSnapshot = await getDoc(userDocRef);
  
  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch(error) {
      console.log("error creating the user", error.message)
    }
  }
   return userDocRef;
};