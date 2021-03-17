import * as React from 'react';
import { useState, useEffect } from 'react';
import firebase from 'firebase';
import SinglePostNew from '../Display/singlePostNew';
import Post from "./Posts";
import { checkUserLoggedIn } from '../../firebase/auth';

export default function HomeFeed(props: any) {
    const [posts, setPosts] = useState<any[]>([]);
    // const auth = checkUserLoggedIn();
    const [following, setFollowing] = useState<any[]>([]);
    const [done, setDone] = useState(false);
    let postsLoaded = false;
    const [lastKey, setLastKey] = useState("" as unknown  as firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>);
    const [nextPosts_loading, setNextPostsLoading] = useState(false);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        if (!done && following.length == 0) {
            // console.log("trying");
            getFollowing();
        }
        
        if(done && following.length > 0 && !postsLoaded){
            postsLoaded = true;
            getPosts();
        }
       
    });
    
    const getFollowing = async () => {
        const f = new Array();
        let doc;

        const result = await firebase
        .firestore()
        .collection('users')
        .doc(props.uid)
        .collection("following").get();

        for (doc of result.docs) {
            // console.log(doc.id);
            f.push(doc.id);
        }

        setDone(true);
        // console.log(f);
        setFollowing(f);
         
    };

    const getPosts = async () => {
        const result = await firebase
            .firestore()
            .collection('Posts')
            .where("uid", "in", following)
            .onSnapshot((snapshot: any) => {
                setPosts(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
            });
        // console.log(result);
    };
    
    return (
        <div>
            {posts.map(({ id, post }) => {
                    return (
                        <SinglePostNew
                            key={id}
                            id={id}
                            username={post.user_name}
                            postPic={post.Image}
                            uid={post.uid}
                            date={new Date(post.post_time.seconds * 1000).toLocaleDateString('en-US')}
                            likes_count={post.likes_count}
                            caption={post.caption}
                            sharedURL={window.location.href}
                            hidden={false}
                            comments_count={post.comments_count}
                        />
                    );
            })}
        </div> 
    );
}
