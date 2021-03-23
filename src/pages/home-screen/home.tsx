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
import { Link, Redirect } from 'react-router-dom';
import SinglePostNew from '../../components/Display/singlePostNew';
import AvatarSmall from '../../components/Display/avatarSmall';
import { FormatListNumberedRtl } from '@material-ui/icons';

export interface HomeScreenProps {}
export interface HomeScreenState {
    posts: any;
    user: any;
    isAuthenticated: boolean;
    uid: string;
    notVerified: boolean;
}
export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(HomeScreenProps: any) {
        super(HomeScreenProps);
        this.state = {
            posts: [],
            user: {},
            isAuthenticated: false,
            uid: '',
            notVerified: false,
        };
    }

    async componentDidMount() {
        const userCheck = checkUserLoggedIn();
        const currentUser = auth.currentUser;

        if (!currentUser?.emailVerified) {
            alert('email verified');
            this.setState({ notVerified: true });
            // } else {
            //     this.setState({ notVerified: true });
            //     alert('email not verified');
        }

        if (userCheck != undefined) {
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
        if (!this.state.notVerified) return <Redirect to={'/welcome'} />;
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
