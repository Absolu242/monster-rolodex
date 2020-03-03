import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCkZ8eogUNbiW5u6N-FLLVAkdo96q-DNJQ",
    authDomain: "e-commerce-8ec82.firebaseapp.com",
    databaseURL: "https://e-commerce-8ec82.firebaseio.com",
    projectId: "e-commerce-8ec82",
    storageBucket: "e-commerce-8ec82.appspot.com",
    messagingSenderId: "50100303059",
    appId: "1:50100303059:web:1fe26fbc58d45bccddd026"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {

    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;