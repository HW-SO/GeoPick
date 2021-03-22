import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import firebase from 'firebase';
import SinglePostNew1 from '../Display/singlePostNew1';

export default function UserFeed1(props: any) {
    const [posts, setPosts] = useState<any[]>([]);
    const firstUpdate = useRef(true);
    
    // loadData = async () => {
    //     const res = await fetch("https://api.agify.io/?name=michael");
    //     setData(await res.json());
      
    // };
    useLayoutEffect(() => {
        if (firstUpdate.current) {
          firstUpdate.current = false;
          return;
        }
    
        // console.log("componentDidUpdateFunction");
        firebase
            .firestore()
            .collection('Posts')
            .where('uid', '==', props.uid)
            .onSnapshot((snapshot: any) => {
                setPosts(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
            });
        // console.log(props.uid)
      });
    //   console.log(props.uid)
    return (
        <div>
            {posts.map(({ id, post }) => {
                return (
                    <SinglePostNew1
                        key={id}
                        id={id}
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
                        comments_count={post.comment_count}
                    />
                );
            })}
        </div>
    );
}
