import * as React from 'react';
import { Component } from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import './homesStyles.scss';
import firebase from 'firebase';
import HomeFeed from '../../components/Layouts/homefeed';
import { Avatar, IconButton, Toolbar, Box, AppBar, Slide } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { checkUserLoggedIn } from '../../firebase/auth';
import BottomNavigation from '../../components/NavBar/navbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import SinglePostNew from '../../components/Display/singlePostNew';
import AvatarSmall from '../../components/Display/avatarSmall';

export interface HomeScreenProps {}
export interface HomeScreenState {
    posts: any;
    user: any;
    isAuthenticated: boolean;
    uid: string;
}
export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(HomeScreenProps: any) {
        super(HomeScreenProps);
        this.state = {
            posts: [],
            user: {},
            isAuthenticated: false,
            uid: '',
        };
    }

    async componentDidMount() {
        const auth = await checkUserLoggedIn();
        if (auth != undefined) {
            this.getUser().then(
                (user) => {
                    this.setState({ isAuthenticated: true, user: user, uid: auth['uid'] });
                },
                (error) => {
                    this.setState({ isAuthenticated: true });
                },
            );
        }
    }

    componentDidUpdate() {
        firebase
            .firestore()
            .collection('Posts')
            .onSnapshot((snapshot: any) => {
                this.setState(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
            });
        // console.log(this.state);
    }

    // getData = () => {
    //     firebase
    //         .firestore()
    //         .collection('Posts')
    //         .orderBy('likes_count')
    //         .get()
    //         .then((querySnapshot) => {
    //             querySnapshot.forEach(function () {
    //                 // console.log(doc.id, ' => ', doc.data());
    //             });
    //         })
    //         .catch((err) => {
    //             console.log('Error getting documents: ', err);
    //         });
    // };

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

    render() {
        // console.log("hello");
        if (!this.state.isAuthenticated) return null;
        return (
            <div style={{ background: '#1b1b1b' }}>
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
                <HomeFeed uid={this.state.uid} />

                <div style={{ padding: '30px' }}></div>
                <BottomNavigation />
            </div>
        );
    }
}
