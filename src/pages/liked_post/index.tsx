// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import firebase from 'firebase';
// // import SinglePostNew from '../Display/singlePostNew';
// // import Post from "./HomePosts";
// import { Typography } from '@material-ui/core';
// import { checkUserLoggedIn } from '../../firebase/auth';
// import { auth } from '../../firebase';
// import SinglePostNew1 from '../../components/Display/singlePostNew1';

// import AvatarSmall from '../../components/Display/avatarSmall';
// import BottomNavigation from '../../components/NavBar/navbar';
// import { Avatar, IconButton, Toolbar, Box, AppBar, Slide } from '@material-ui/core';
// import WhiteLogo from '../welcome screen/WhiteLogo.svg';
// import { Link } from 'react-router-dom';
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import {getUserLikedPost, getPostByID} from "../../firebase/db"


// export default function LikedPosts(props: any) {
//     const [posts, setPosts] = useState<firebase.firestore.DocumentData[]>([]);
//     const [filled, setFilled] = useState<boolean>(false);

    
//     useEffect( () => {
//        const getPosts = async () => { 
//             const postsID = await getUserLikedPost(); 

//             const postArray:firebase.firestore.DocumentData[] = []

//             postsID.map(async (doc)  => {
//                 if (!doc) return null;
//                 const post = await getPostByID(doc.id);
//                 if (post) 
//                     postArray.push({...post, id: doc.id});
//             });

//                 console.log("before set post ", postArray)
//                 setPosts(postArray);
//                 if (posts.length) setFilled(true)

//         }
//         if (!filled) getPosts();
//         })

//         // const getPosts = () => { 
//         //     const postArray:firebase.firestore.DocumentData[] = [];
//         //     getUserLikedPost().then(posts => {
//         //         posts.map((doc)  => {
//         //         if (!doc) return null;
//         //         getPostByID(doc.id).then(post => {
//         //             if (post) 
//         //             postArray.push({...post, id: doc.id});
//         //             });
//         //         })
                
//         //     }).then(doc => {
//         //         setPosts(postArray);
//         //         setFilled(true);
//         //     }); 
//         // }

        

//         if (filled) {
//             return <>
//                 {posts.map((post, id) => (
//                             <SinglePostNew1
//                                         key={id}
//                                         id={post.id}
//                                         username={post.username}
//                                         postPic={post.Image}
//                                         uid={post.uid}
//                                         date={new Date(post.post_time.seconds * 1000).toLocaleDateString('en-US')}
//                                         likes_count={post.likes_count}
//                                         caption={post.caption}
//                                         hidden={false}
//                                         comments_count={post.comment_count}
//                                         location={post.location} 
//                                     />
//                 ))}
//             </>
//         } else {
//             console.log("post inside render ", posts)
//             return (
//             <div style={{ background: '#1b1b1b' }}>
//                 no fucking post bitch
                
//             <div style={{ padding: '30px' }}></div>
//                 {/* <BottomNavigation /> */}
//             </div>
//         );
//         }

// }

export{}

