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
import { auth } from '../../firebase';
import { Link, Redirect } from 'react-router-dom';
import SinglePostNew from '../../components/Display/singlePostNew';
import AvatarSmall from '../../components/Display/avatarSmall';
import { FormatListNumberedRtl } from '@material-ui/icons';

export interface HomeScreenProps {
    uid?: string;
}
export interface HomeScreenState {}
export class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(HomeScreenProps: any) {
        super(HomeScreenProps);
    }

    render() {
        // console.log("hello");

        return (
            <div style={{ background: '#1b1b1b' }}>
                {!this.props.uid && <p style={{ color: 'white' }}>Please log in first!</p>}
                {this.props.uid && <HomeFeed uid={this.props.uid} />}
                <div style={{ padding: '30px' }}></div>
            </div>
        );
    }
}
