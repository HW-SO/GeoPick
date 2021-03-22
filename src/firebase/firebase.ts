/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import 'firebase/auth';
import 'firebase/database';
import firebase from 'firebase';
import cred from '../constants/firebase-creds.json';
import 'dot-env';
import 'firebase/storage';
// import '@firebase/messaging';
//import './sign-in screen';
const prodConfig = {
    apiKey: cred.REACT_APP_API_KEY,
    authDomain: cred.REACT_APP_AUTH_DOMAIN,
    databaseURL: cred.REACT_APP_DATABASE_URL,
    projectId: cred.REACT_APP_PROJECT_ID,
    storageBucket: cred.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: cred.REACT_APP_MESSAGING_SENDER_ID,
};

const devConfig = {
    apiKey: cred.REACT_APP_DEV_API_KEY,
    authDomain: cred.REACT_APP_DEV_AUTH_DOMAIN,
    databaseURL: cred.REACT_APP_DEV_DATABASE_URL,
    projectId: cred.REACT_APP_DEV_PROJECT_ID,
    storageBucket: cred.REACT_APP_DEV_STORAGE_BUCKET,
    messagingSenderId: cred.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// class firebase {
//     auth: app.auth.Auth; // variable assigned for auth
//     static auth: app.auth.Auth;
//     providerGoogle: app.auth.GoogleAuthProvider | undefined;

//     constructor() {
//         app.initializeApp(config);
//         this.auth = app.auth(); // auth api, use this.auth to use it
//     }

//     /**============================================
//      **               AUTH API
//      *=============================================**/

//     // signup with email and pass
//     doCreateUserWithEmailAndPassword = (email: string, password: string) =>
//         this.auth.createUserWithEmailAndPassword(email, password);

//     doSignInWithEmailAndPassword = (email: string, password: string) =>
//         this.auth.signInWithEmailAndPassword(email, password);

//     doSignOut = () => this.auth.signOut();

//     getGoogleProvider = () => {
//         this.providerGoogle = new app.auth.GoogleAuthProvider();
//         return this.providerGoogle;
//     };

//     getApp = () => {
//         return app;
//     }

//     getStorage = () => {
//         return app.storage();
//     }

if (!firebase.apps.length) {
   firebase.initializeApp(config);
   firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);


}
// app.initializeApp(config);

// const signIn=(email:string,password:string)=>{
//     auth.signInWithEmailAndPassword(email,password).then((u)=>{
//         console.log("sucessfully logged");
        
//     }).catch((err)=>{
//         console.log("Error "+ err.toString);
//     })
// }

// let messaging;

// // we need to check if messaging is supported by the browser
// if(firebase.messaging.isSupported()) {
//     messaging = firebase.messaging();
// }

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', async () => {
//         const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
//             updateViaCache: 'none'
//         });
//         messaging.useServiceWorker(registration);
//     });
// }

firebase.firestore().enablePersistence()
  .catch((err) => {
      if (err.code === 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code === 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
});
export const auth = firebase.auth();
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const db = firebase.database();
export default auth;
export const storage = firebase.storage();

// export {
//     messaging
// };