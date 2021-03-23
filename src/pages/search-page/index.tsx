import React from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import Card from '../../components/Layouts/Card';
import TextField from '../../components/Inputs/TextField';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Box, Typography } from '@material-ui/core';
import firebase from 'firebase';
import ProfileOverview from '../../components/Display/profileOverview';
import Button from '@material-ui/core/Button';
import SinglePostNew1 from '../../components/Display/singlePostNew1';
import Feed from '../../components/Layouts/feed';
import './search.scss';
import { Component } from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../../firebase';
import { IconButton, Toolbar, AppBar} from '@material-ui/core';
import BottomNavigation from '../../components/NavBar/navbar';
import { Link } from 'react-router-dom';
import AvatarSmall from '../../components/Display/avatarSmall';
import { checkUserLoggedIn } from '../../firebase/auth';



export interface SearchProps {}

export interface SearchState {
    users: Array<any>;
    posts: Array<any>;
    userOn: boolean;
    postOn: boolean;
    query: string;
    uid: string;
    user: any;
}


export default class SearchScreen extends Component<SearchProps, SearchState>  {
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
            uid: '',
            user: {},
        };
    }

    async componentDidMount() {
        const auth = await checkUserLoggedIn();
        if (auth != undefined) {
            this.getUser().then(
                (user) => {
                    this.setState({ user: user, uid: auth['uid'] });
                },
                (error) => {
                    // this.setState({ });
                },
            );
        }
    }

    getUser = () => {
        const auth = checkUserLoggedIn();
        return new Promise(function (resolve, reject) {
            if (auth === undefined) {
            } else {
                firebase
                    .firestore()
                    .collection('users')
                    .doc(auth['uid'])
                    .get()
                    .then((querySnapshot) => {
                        const data = querySnapshot.data();
                        // this.se
                        if (querySnapshot.data()) {
                            resolve(data);
                        } else {
                            reject('User not authenticated');
                        }
                    });
            }
        });
    };

    signOut = () => {
        auth.doSignOut();
    };

        toggleUser = () => {
        // setUserOn(true);
        // setPostOn(false);
        this.setState({userOn:true,postOn:false});

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
                this.setState({users: users,posts:[]});

            });
    };

        togglePost = () => {
        // setUserOn(false);
        // setPostOn(true);
        this.setState({userOn:false,postOn:true});
        firebase
            .firestore()
            .collection('Posts')
            .where('tags', 'array-contains',this.state.query)
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
                this.setState({users:[] ,posts:posts});
            });
    };

    fetchResults = (search: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({query: search.target.value.toLowerCase()});
        if (this.state.userOn) {
            this.toggleUser();
        }
        if (this.state.postOn) {
            this.togglePost();
        }
    };
    render(){
    return (
        <div className="background">
            <AppBar position="fixed" style={{ background: '#1b1b1b' }}>
                    <Toolbar style={{ position: 'relative' }}>
                        <Link to="/welcome">
                            <IconButton edge="end" onClick={this.signOut}>
                                <ExitToAppIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Link>

                        <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
                        <AvatarSmall
                            User={this.state.user}
                            uid={this.state.uid}
                            User_name={this.state.user.User_name}
                            Avatar={this.state.user.Avatar}
                            Size="small"
                        />
                    </Toolbar>
                </AppBar>


            <div id="titleDiv">
                {/* <Card background="#202020" title="Search" split={2}> */}
                {/* <div>Sea</div> */}
                <Typography variant="h3" color="inherit">Search</Typography> 
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
                    <Box marginLeft={8} marginRight={8} display="flex" justifyContent="space-between">
                        <Typography variant="h5" style={{ float: 'left', color: '#fafafa' }}>
                            Based on
                        </Typography>
                        <br/>
                        {/* <Box > */}
                        <Button variant="contained" className="tags-button" onClick={this.togglePost}>
                            Tags
                        </Button>{'         '}

                        <Button variant="contained" className="users-button" onClick={this.toggleUser}>
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
                    {(this.state.posts.length == 0 && this.state.users.length == 0) && <Feed />}
                {/* </Card> */}
            </div>
            <br />
            <BottomNavigation />
        </div>
    );
}
}
