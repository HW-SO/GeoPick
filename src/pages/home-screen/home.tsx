import * as React from 'react';
import { Component, useEffect } from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import './homesStyles.scss';
// import SinglePost from './singlePost';
import Picture from './welcome-pg.png';
import { storage } from '../../firebase/firebase';
import firebase from 'firebase';
import Feed from '../../components/Layouts/feed';
import { AppBar, Avatar, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { checkUserLoggedIn } from '../../firebase/auth';

export interface HomeScreenProps {}
export interface HomeScreenState {
    posts: any;
    user: any;
}

export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(HomeScreenProps: any) {
        super(HomeScreenProps);
        this.state = {
            posts: [],
            user: checkUserLoggedIn(),
        };
    }

    componentDidUpdate() {
        firebase
            .firestore()
            .collection('Posts')
            .onSnapshot((snapshot: any) => {
                this.setState(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
            });
        console.log(this.state);
    }

    getData = () => {
        firebase
            .firestore()
            .collection('Posts')
            .orderBy('likes_count')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(function (doc) {
                    console.log(doc.id, ' => ', doc.data());
                });
            })
            .catch((err) => {
                console.log('Error getting documents: ', err);
            });
    };

    render() {
        return (
            <div style={{ background: '#1b1b1b' }} onLoad={this.getData}>
                <Toolbar>
                    <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
                    <IconButton edge="end">
                        <Avatar alt={this.state.user.User_name}src={this.state.user.Avatar} />
                    </IconButton>
                </Toolbar>

                <Feed />
            </div>
        );
    }
}
