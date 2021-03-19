import { auth, GoogleProvider } from './firebase';

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
    if (auth.currentUser) return auth.currentUser;
};
