import React from 'react';
import TextField from '../../components/Inputs/TextField';
import { Box, Typography } from '@material-ui/core';
import firebase from 'firebase';
import ProfileOverview from '../../components/Display/profileOverview';
import Button from '@material-ui/core/Button';
import SinglePostNew from '../../components/Display/singlePostNew';
import Feed from '../../components/Layouts/feed';
import './search.scss';
import { Component } from 'react';

export interface SearchProps {
    uid?: string;
}
export interface SearchProps {}

export interface SearchState {
    users: Array<any>;
    posts: Array<any>;
    userOn: boolean;
    postOn: boolean;
    query: string;
}

export default class SearchScreen extends Component<SearchProps, SearchState> {
    // const [users, setUsers] = useState(Array());
    // const [posts, setPosts] = useState(Array());
    // const [userOn, setUserOn] = useState(false);
    // const [postOn, setPostOn] = useState(false);
    // const [query, setQuery] = useState('');

    constructor(SearchProps: any) {
        super(SearchProps);
        this.state = {
            users: [],
            posts: [],
            userOn: false,
            postOn: false,
            query: '',
        };
    }

    toggleUser = () => {
        // setUserOn(true);
        // setPostOn(false);
        this.setState({ userOn: true, postOn: false });

        firebase
            .firestore()
            .collection('users')
            .where('User_name', '>=', this.state.query)
            .limit(5)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                // setUsers(users);
                // setPosts([]);
                this.setState({ users: users, posts: [] });
            });
    };

    togglePost = () => {
        // setUserOn(false);
        // setPostOn(true);
        this.setState({ userOn: false, postOn: true });
        firebase
            .firestore()
            .collection('Posts')
            .where('tags', 'array-contains', this.state.query)
            .limit(5)
            .get()
            .then((snapshot) => {
                let posts = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                // setPosts(posts);
                // setUsers([]);
                this.setState({ users: [], posts: posts });
            });
    };

    fetchResults = (search: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: search.target.value.toLowerCase() });
        if (this.state.userOn) {
            this.toggleUser();
        }
        if (this.state.postOn) {
            this.togglePost();
        }
    };
    render() {
        return (
            <div className="background">
                <div id="titleDiv">
                    {/* <Card background="#202020" title="Search" split={2}> */}
                    {/* <div>Sea</div> */}
                    <Typography variant="h3" color="inherit">
                        {/* Search */}
                    </Typography>
                    <br></br>
                    {/* <CardTitle title="Search" split={2} /> */}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Search"
                        variant="outlined"
                        placeholder="Search here..."
                        onChange={this.fetchResults}
                    />
                    <br></br>
                    <Box marginLeft={4} marginRight={4} display="flex" justifyContent="space-evenly">
                        <Typography variant="h5" style={{ float: 'left', color: '#fafafa' }}>
                            Based on
                        </Typography>
                        <br />
                        {/* <Box > */}
                        <Button
                            variant="contained"
                            className="tags-button"
                            onClick={this.togglePost}
                            style={{
                                float: 'right',
                                borderRadius: '20px',
                                color: '#f56920',
                                background: '#fafafa',
                                marginRight: '10px',
                            }}
                        >
                            Tags
                        </Button>
                        {'         '}
                        <br />
                        <Button
                            variant="contained"
                            className="users-button"
                            onClick={this.toggleUser}
                            style={{
                                float: 'right',
                                borderRadius: '20px',
                                color: '#f56920',
                                background: '#fafafa',
                                marginRight: '10px',
                            }}
                        >
                            Users
                        </Button>
                        {/* </Box> */}
                    </Box>
                    <br />
                    <br />
                    {this.state.users.length > 0 &&
                        this.state.users.map((data) => {
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

                    {this.state.posts.length > 0 &&
                        this.state.posts.map((data) => {
                            // console.log(data);
                            return (
                                <div>
                                    <SinglePostNew
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
                                        owner={this.props.uid}
                                        nogame
                                    />
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                    {this.state.posts.length === 0 && this.state.users.length === 0 && <Feed uid={this.props.uid} />}
                    {/* </Card> */}
                </div>
            </div>
        );
    }
}
