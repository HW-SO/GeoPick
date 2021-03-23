import * as React from 'react';
import { useState, useRef, useLayoutEffect } from 'react';
import firebase from 'firebase';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import SinglePostNew1 from '../Display/singlePostNew1';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import './userGrid.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    gridList: {
      maxWidth: 250,
      maxHeight: 200,
    },
  }),
);

export default function UserFeed1(props: any) {
    const classes = useStyles();
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
                setPosts(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data().Image })));
            });
        // console.log(props.uid)
      });
    //   console.log(props.uid)
    return (
        <div className="img-grid">
        {posts && posts.map(({ id, post }) => (
        <Link to={{ pathname: `/post/${id}`, state: id }}>
          <div className="img-wrap" key={id}>
            <img src={post} alt={post}/>
          </div>
          </Link>
        ))}
      </div>
        // <div className={classes.root}>
        //      <Grid container justify="center" spacing={4} style={{display: 'flex', flexWrap: 'wrap', padding: '0 4px'}}> 
        //         {posts.map(({ id, post }) => (
        //              <Link to={{ pathname: `/post/${id}`, state: id }}>
        //         {/* <GridListTile  key={id} > */}
        //         <Grid
        //             item
        //             xs={3}
        //             key = {id}
        //             style={{
        //                 // borderRadius: '20px 20px 20px 20px',
        //                 maxHeight: '5vh',
        //                 maxWidth: '40vh',
        //                 // paddingTop: '56.25%',
        //                 // paddingRight: '10%',
        //                 // paddingLeft: '10%',
        //                 marginLeft: '10px',
        //                 marginRight: '10px',
        //                 marginTop: '10px',
        //                 marginBottom: '10px',
                        
        //             }}
        //         >
        //             <img src={post} alt={post} style={{objectFit: 'cover'}} />
        //         </Grid>
        //         {/* </GridListTile> */}
                
        //         </Link>
        //         ))}
        //     </Grid>
        //     {/* {posts.map(({ id, post }) => {
        //         return (
        //             <SinglePostNew1
        //                 key={id}
        //                 id={id}
        //                 // profileUrl={post.profileUrl}
        //                 username={post.user_name}
        //                 postPic={post.Image}
        //                 uid={post.uid}
        //                 // caption={post.caption}
        //                 // comments={post.comments}
        //                 date={new Date(post.post_time.seconds * 1000).toLocaleDateString('en-US')}
        //                 likes_count={post.likes_count}
        //                 caption={post.caption}
        //                 sharedURL={window.location.href}
        //                 hidden={false}
        //                 comments_count={post.comment_count}
        //             />
        //         );
        //     })} */}
        // </div>
    );
}
