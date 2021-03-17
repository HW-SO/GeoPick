import React, { useState } from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import TextField from '../../components/Inputs/TextField';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Box, Typography } from '@material-ui/core';
import firebase from 'firebase';
import ProfileOverview from '../../components/Display/profileOverview';
import Button from '@material-ui/core/Button';
import SinglePostNew1 from '../../components/Display/singlePostNew1';
import Feed from '../../components/Layouts/feed';
import './search.scss';

export interface SearchProps {}

export default function SearchScreen() {
    const [users, setUsers] = useState(Array());
    const [posts, setPosts] = useState(Array());
    const [userOn, setUserOn] = useState(false);
    const [postOn, setPostOn] = useState(false);
    const [query, setQuery] = useState('');

    const toggleUser = () => {
        setUserOn(true);
        setPostOn(false);
        firebase
            .firestore()
            .collection('users')
            .where('User_name', '>=', query)
            .limit(5)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                setUsers(users);
                setPosts([]);
            });
    };

    const togglePost = () => {
        setUserOn(false);
        setPostOn(true);
        firebase
            .firestore()
            .collection('Posts')
            .where('tags', 'array-contains', query)
            .limit(5)
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                setPosts(posts);
                setUsers([]);
            });
    };

    const fetchResults = (search: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(search.target.value.toLowerCase());
        if (userOn) {
            toggleUser();
        }
        if (postOn) {
            togglePost();
        }
    };

    return (
        <div className="background">
            <div className="button" style={{ float: 'left' }}>
                <ArrowBackRoundedIcon />
            </div>
            <div className="image">
                <img src={WhiteLogo} alt="GeoPicK Logo" className="WhiteLogo" />
            </div>
            <div id="titleDiv">
                <Card background="#202020" title="Search" split={2}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Search"
                        variant="outlined"
                        placeholder="Search here..."
                        onChange={fetchResults}
                    />
                    <br></br>
                    <Box>
                        <Typography variant="h5" style={{ float: 'left', color: '#fafafa' }}>
                            Based on
                        </Typography>
                        <Button variant="contained" className="tags-button" onClick={togglePost}>
                            Tags
                        </Button>
                        <Button variant="contained" className="users-button" onClick={toggleUser}>
                            Users
                        </Button>
                    </Box>
                    <br />
                    <br />
                    {users.length > 0 &&
                        users.map((data) => {
                            // console.log(data);
                            return (
                                <div>
                                    <ProfileOverview
                                        key={data.id}
                                        uid={data.id}
                                        User_name={data.User_name}
                                        Avatar={data.Avatar}
                                        Size="small"
                                        User={data}
                                        followers
                                    />
                                    <br />
                                    <br />
                                </div>
                            );
                        })}

                    {posts.length > 0 &&
                        posts.map((data) => {
                            // console.log(data);
                            return (
                                <div>
                                    <SinglePostNew1
                                        key={data.id}
                                        id={data.id}
                                        // profileUrl={post.profileUrl}
                                        username={data.user_name}
                                        postPic={data.Image}
                                        uid={data.uid}
                                        // caption={post.caption}
                                        // comments={post.comments}
                                        date={new Date(data.post_time.seconds * 1000).toLocaleDateString('en-US')}
                                        likes_count={data.likes_count}
                                        caption={data.caption}
                                        sharedURL={window.location.href}
                                        hidden={false}
                                        comments_count={data.comments_count}
                                    />
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                    {(posts.length == 0 && users.length == 0) && <Feed />}
                </Card>
            </div>
            <br />
        </div>
    );
}
