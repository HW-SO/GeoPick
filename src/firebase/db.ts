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
    console.log(await firestore.collection('Posts').doc(id).collection('Likes').get());

    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);

    const post = firestore.collection('Posts').doc(id); // post doc
    // await post.collection('Likes').doc('do_not_remove').set({});
    const like = post.collection('Likes').doc(currentUser.uid);
    like.get().then((doc) => {
        if (doc.exists) {
            post.get().then((doc) =>
                doc.data() && doc.data()!.likes_count > 0 ? post.update({ likes_count: decrement }) : null,
            );
            like.delete();
        } else {
            post.update({ likes_count: increment });
            like.set({});
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
