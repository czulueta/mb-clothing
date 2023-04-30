import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB3x8MFYYtZVYHOvGJuHIxM-MQiuaIUGXo",
  authDomain: "mostblessed-clothing-app.firebaseapp.com",
  projectId: "mostblessed-clothing-app",
  storageBucket: "mostblessed-clothing-app.appspot.com",
  messagingSenderId: "399344699095",
  appId: "1:399344699095:web:b09495e5163a0310efd292"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyCOZFG8NKNchdsYlbbQAItm5HvvYzIXKTY",
//   authDomain: "mb2-clothing-app2.firebaseapp.com",
//   projectId: "mb2-clothing-app2",
//   storageBucket: "mb2-clothing-app2.appspot.com",
//   messagingSenderId: "126250613306",
//   appId: "1:126250613306:web:78f5f948a457d7b0891303"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyCOZFG8NKNchdsYlbbQAItm5HvvYzIXKTY",
//   authDomain: "mb2-clothing-app2.firebaseapp.com",
//   projectId: "mb2-clothing-app2",
//   storageBucket: "mb2-clothing-app2.appspot.com",
//   messagingSenderId: "126250613306",
//   appId: "1:126250613306:web:0682bddb8d7a4f9b891303"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyBI2o5JsRSHsa-Oa9x2RMhXW5jjRLuwGOk",
//   authDomain: "mb-clothing-db.firebaseapp.com",
//   projectId: "mb-clothing-db",
//   storageBucket: "mb-clothing-db.appspot.com",
//   messagingSenderId: "175240573725",
//   appId: "1:175240573725:web:5499afd2ee33b0b6c2e7f4"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBI2o5JsRSHsa-Oa9x2RMhXW5jjRLuwGOk",
//   authDomain: "mb-clothing-db.firebaseapp.com",
//   projectId: "mb-clothing-db",
//   storageBucket: "mb-clothing-db.appspot.com",
//   messagingSenderId: "175240573725",
//   appId: "1:175240573725:web:672cdd08571ef625c2e7f4"
// };


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth, 
  additionalInformation = {}
  ) => {
  if(!userAuth) return;
  
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
        ...additionalInformation,
      });
    } catch(error) {
      console.log("error creating the user", error.message)
    }
  }
   return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
  };
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);