import firebase from 'firebase';
import auth, { db, firestore } from './firebase';

// User API
export const doCreateUser = (id: string, username: string, email: string) =>
    db.ref(`users/${id}`).set({
        email,
        username,
    });

export const onceGetUsers = () => db.ref('users').once('value');

export const addOrRemoveLikeToPost = async (id: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return new Error('cannot like without sigining in.');
    }

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const post = firestore.collection('Posts').doc(id); // post doc
    const userLikes = firestore.collection('users').doc(currentUser.uid).collection('Likes').doc(id); // user like doc
    const like = post.collection('Likes').doc(currentUser.uid); // like doc

    like.get().then((doc) => {
        if (doc.exists) {
            post.get().then((doc) =>
                doc.data() && doc.data()!.likes_count > 0 ? post.update({ likes_count: decrement }) : null,
            ); // post like count decremented
            like.delete(); // delete the like from posts
            userLikes.delete(); // delete post uid in likes of user
        } else {
            post.update({ likes_count: increment }); // update like count
            like.set({}); // set like of user in post
            userLikes.set({
                Post_ID: id
            }); // set post uid in likes of user
        }
    });
    // if like has that uid
};

export const checkLikedPost = async (id: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        return new Error('cannot like without sigining in.');
    }

    const post = firestore.collection('Posts').doc(id); // post doc
    const like = post.collection('Likes').doc(currentUser.uid); // like doc in post
    const likeExists = (await like.get()).exists;

    // if like has that uid
    if (likeExists) return true;
    else return false;
};
