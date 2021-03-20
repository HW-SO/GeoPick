import { auth, GoogleProvider } from './firebase';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Sign Up with email
export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

// Sign In with email
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);

export const doGoogleSignUp = async () => await auth.signInWithPopup(GoogleProvider);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email: string) => auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = async (password: string) => {
    if (auth.currentUser) {
        await auth.currentUser.updatePassword(password);
    }
    throw Error("User isn't logged in");
};

export const doEmailVerification = async (email: string) => {
    if (auth.currentUser) {
        await auth.currentUser.sendEmailVerification();
    }
    throw Error("/**  */");
};

export const checkUserLoggedIn = () => {

    // let user = await auth.currentUser;
    // if(user) return user;

    // auth.onAuthStateChanged(function(user) {
    //     if (user) {
    //         console.log(user);
    //       return user;
    //     } else {
    //       // No user is signed in.
    //       return false;
    //     }
    //   });
    
    // auth.onAuthStateChanged(async function(user) {
    //     if (user) {
    //         const u = await user;
    //       return u;
    //     } else {
    //       return false;
    //     }
    //   });
    if (auth.currentUser) return auth.currentUser;
};



export function useProtectedRoute() {
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(function(user) {
      if (!user) {
        console.error(
          'Access to protected route denied, redirecting to login...'
        );
        history.push('/auth/login');
      }
    });
  }, [history]);
}