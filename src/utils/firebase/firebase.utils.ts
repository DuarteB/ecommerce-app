import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

interface IUserAuth {
  uid: string,
  displayName: string | null,
  email: string | null
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE2d8tUDSIR7srgAUiDEXifIy7IY8UMWw",
  authDomain: "ecommerce-app-59855.firebaseapp.com",
  projectId: "ecommerce-app-59855",
  storageBucket: "ecommerce-app-59855.appspot.com",
  messagingSenderId: "602840357256",
  appId: "1:602840357256:web:5f9782af5451af5eb9023d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider =  new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(
  userAuth: IUserAuth,
  additionalInformation?: any
) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email: string, password: string) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback: any) => {
  onAuthStateChanged(auth, callback);
}