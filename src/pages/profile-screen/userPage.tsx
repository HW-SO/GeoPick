import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { Component } from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import BadgeAvatar from '../../components/Display/AddAvatarBadge';
import SinglePostNew from '../../components/Display/singlePostNew';
import ProfileOverview from '../../components/Display/profileOverview';
import { checkUserLoggedIn } from '../../firebase/auth';
import firebase from 'firebase';
import UserFeed1 from '../../components/Layouts/userFeed1';

import { auth } from '../../firebase';
export interface UserPageProps {}

export interface UserPageState {
    posts: any;
    user: any;
    isAuthenticated: boolean;
    uid: string;
    user_uid: string;
}

class UserPage extends Component<UserPageProps, UserPageState> {
    constructor(UserPageProps: any) {
        super(UserPageProps);
        this.state = {
            posts: [],
            user: {},
            isAuthenticated: false,
            uid: '',
            user_uid: '',
        };
    }

    componentDidMount() {
        const path = window.location.pathname.split('/');
        const uid = path[path.length - 1];
        const u = checkUserLoggedIn();
        if (u) this.setState({ user_uid: u.uid });

        this.getUser().then(
            (user) => {
                this.setState({ isAuthenticated: true, user: user, uid: uid });
                console.log(this.state.user);
                console.log(this.state.uid);
            },
            (error) => {
                this.setState({ isAuthenticated: true });
            },
        );
    }

    // getSelf = async () => {
    //     const uuid = await checkUserLoggedIn();
    //     if(uuid)
    //         return uuid.uid;
    // }
    // componentDidUpdate() {

    //     const auth = checkUserLoggedIn();
    //     if(auth != undefined){

    //     }

    // }

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
        const path = window.location.pathname.split('/');
        const uid = path[path.length - 1];

        return new Promise(function (resolve, reject) {
            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((querySnapshot) => {
                    const data = querySnapshot.data();
                    const id = querySnapshot.id;
                    if (data) {
                        resolve(data);
                    } else {
                        reject('User not authenticated');
                    }
                });
        });
    };

    signOut = () => {
        auth.doSignOut();
    };

    render() {
        return (
            <div style={{ background: '#1b1b1b', height: 'auto' }}>
                <img
                    src={WhiteLogo}
                    alt="GeoPicK"
                    style={{ width: '200px', height: '66px', margin: 'auto', paddingBottom: '1em' }}
                />
                <ProfileOverview
                    User={this.state.user}
                    User_name={<span style={{ fontSize: 'calc(12px + 2vw)' }}>{this.state.user.User_name}</span>}
                    Avatar={this.state.user.Avatar}
                    Size="large"
                />
                <br></br>
                <br></br>
                {this.state.user_uid === this.state.uid && (
                    <>
                        <Button
                            style={{
                                paddingLeft: '15%',
                                paddingRight: '15%',
                                background: '#f56920',
                                borderRadius: '20px',
                                marginRight: '10%',
                            }}
                        >
                            <Typography variant="button" style={{ color: '#fafafa' }}>
                                Edit Profile
                            </Typography>
                        </Button>
                        <Button
                            style={{
                                background: '#1b1b1b',
                                border: '3px solid #f56920',
                                borderRadius: '20px',
                                maxWidth: '600px',
                                margin: 'auto',
                                paddingLeft: '5%',
                                paddingRight: '5%',
                            }}
                            onClick={this.signOut}
                        >
                            <Link to="/welcome">
                                <Typography variant="button" style={{ color: '#fafafa' }}>
                                    Sign Out
                                </Typography>
                            </Link>
                        </Button>{' '}
                    </>
                )}
                <div style={{ margin: 'auto' }}>
                    <Typography variant="h4" style={{ color: '#fafafa', paddingTop: '25px' }}>
                        My <span style={{ color: '#f56920' }}>Posts</span>
                    </Typography>
                </div>
                <UserFeed1 uid={this.state.uid} />
            </div>
        );
    }
}

export default UserPage;
