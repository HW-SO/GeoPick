import * as React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import SinglePostNew from '../Display/singlePostNew';
import Post from "./HomePosts";
import { Typography } from '@material-ui/core';


export default function HomeFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const [done, setDone] = useState(false);
    const [postLoaded, setPostLoaded] = useState(false);
    const [lastKey, setLastKey] = useState("" as unknown  as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>);
    const [nextPosts_loading, setNextPostsLoading] = useState(false);

    useEffect(() => {
        if (!done && following.length === 0) {
            // console.log("trying");
            getFollowing();
        }
        
        if(done && following.length > 0 && !postLoaded){
            // postLoaded = true;
            // getPosts();
            Post.postsFirstBatch(following)
          .then((res) => {
            if (res) {
            setPosts(res.posts);
            // console.log(res.posts[0])
            setLastKey(res.lastKey);
          } else return
        })
          .catch((err) => {
            console.log(err);
          });
          setPostLoaded(true);
        }
       
    },[following.length]);
    
    const getFollowing = async () => {
        const f = new Array();
        let doc;
        console.log("following in");
        const result = await firebase
        .firestore()
        .collection('users')
        .doc(props.uid)
        .collection("following").get();

        for (doc of result.docs) {
            f.push(doc.id);
        }

        setDone(true);
        setFollowing(f);
         
    };

    // const getPosts = async () => {
    //     console.log("posts in");
    //     const result = await firebase
    //         .firestore()
    //         .collection('Posts')
    //         .where("uid", "in", following)
    //         .onSnapshot((snapshot: any) => {
    //             setPosts(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
    //             setPostLoaded(true);
    //         });
    //     // console.log(result);
    // };
    
    // return (
    //     <div>
    //         {posts.map(({ id, post }) => {
    //                 return (
    //                     <SinglePostNew
    //                         key={id}
    //                         id={id}
    //                         username={post.user_name}
    //                         postPic={post.Image}
    //                         uid={post.uid}
    //                         date={new Date(post.post_time.seconds * 1000).toLocaleDateString('en-US')}
    //                         likes_count={post.likes_count}
    //                         caption={post.caption}
    //                         sharedURL={window.location.href}
    //                         hidden={false}
    //                         comments_count={post.comment_count}
    //                         location = {post.location}
    //                     />
    //                 );
    //         })}
    //     </div> 
    // );

    const fetchMorePosts = (key:firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>) => {
        console.log("hello thereee")
      if (key ) {
        setNextPostsLoading(true);
        Post.postsNextBatch(key, following)
          .then((res) => {
            if (res) {
            setLastKey(res.lastKey);
            // add new posts to old posts
            setPosts(posts.concat(res.posts));
            setNextPostsLoading(false);
          } else return
        })
          .catch((err) => {
            console.log(err);
            setNextPostsLoading(false);
          });
      }
    };
  
  const allPosts = (
      <div>
          {posts.map((post) => {
              if (post) {
                // console.log("feed id", post)
                // const loc = getLocations(post.location);
                return (
                  <SinglePostNew
                      key={post.id}
                      id={post.id}
                      // profileUrl={post.profileUrl}
                      username={post.user_name}
                      postPic={post.Image}
                      uid={post.uid}
                      // caption={post.caption}
                      // comments={post.comments}
                      date={new Date(post.post_time.seconds * 1000).toLocaleDateString('en-US')}
                      likes_count={post.likes_count}
                      caption={post.caption}
                      sharedURL={window.location.href}
                      hidden={false}
                      comments_count={post.comments_count}
                      location = {post.location}
                      // otherLocs = {getLocations(post.location)}
                  />
              );
              } else return (<Typography color="inherit">No posts to show! Follow people to find more people!</Typography>);
          })}
      </div>
  );
  return (
      <div>
          <div>{posts ? allPosts : null}</div>
          <div style={{ textAlign: "center" }}>
      {nextPosts_loading ? (
        <p>Loading..</p>
      ) : ((lastKey) ? (
        <button onClick={() => fetchMorePosts(lastKey)}>More Posts</button>
      ) : (
        <Typography color="inherit">You are up to date!</Typography>
      ))}
    </div>
      </div>
  );
}
