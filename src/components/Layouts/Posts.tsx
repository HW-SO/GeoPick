import firebase from 'firebase';

export default {
  /**
   * this function will be fired when you first time run the app,
   * and it will fetch first 5 posts, here I retrieve them in descending order, until the last added post appears first.
   */
  postsFirstBatch: async function () {
    try {
      const data = await firebase
      .firestore()
      .collection('Posts')
      .orderBy('likes_count', "desc")
        .limit(5)
        .get();

      let posts:Array<any> = [];
      let lastKey:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> = "" as unknown as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;
      data.forEach((doc) => {
        posts.push({...doc.data(), id: doc.id});
        
        lastKey = (doc)
      });
      console.log(lastKey)
      return { posts, lastKey };
    } catch (e) {
      console.log(e);
    }
  },

  /**
   * this function will be fired each time the user click on 'More Posts' button,
   * it receive key of last post in previous batch, then fetch next 5 posts
   * starting after last fetched post.  
   */
  postsNextBatch: async (key:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
    try {
      const data = await firebase
      .firestore()
      .collection('Posts')
      .orderBy('likes_count', "desc")
        .startAfter(key)
        .limit(5)
        .get();

      let posts:Array<any> = [];
      let lastKey:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData> = "" as unknown as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;

      data.forEach((doc) => {
        posts.push({...doc.data(), id: doc.id});
        lastKey = (doc);
      });
      
      return { posts, lastKey };
    } catch (e) {
      console.log(e);
    }
  }
};