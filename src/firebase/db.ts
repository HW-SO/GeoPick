import firebase from 'firebase';
import { currentUser } from './auth';
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
                Post_ID: id,
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

export const getUserLikedPost = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        alert('not logged in');
        return [];
    }

    const posts = await firestore.collection('users').doc(currentUser.uid).collection('Likes').get();
    return posts.docs;
};

export const getPostByID = async (id: string) => {
    const post = await firestore.collection('Posts').doc(id).get();

    if (!post.data()) return undefined;
    else return post.data();
};

export const didUserPlay = async (pid: string) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return true;

    const post = await firestore.collection('Posts').doc(pid).collection('players').doc(currentUser.uid).get();

    if (post.exists) return true;
    return false;
};

export const userPlay = async (pid: string, points: number) => {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;

    const played = await didUserPlay(pid);

    if (played) return true;

    const pointFB = firebase.firestore.FieldValue.increment(points);
    const post = await firestore.collection('Posts').doc(pid).collection('players').doc(currentUser.uid).set({});

    await firestore.collection('users').doc(currentUser.uid).update({
        GamePoint: pointFB,
    });
    return true;
};
