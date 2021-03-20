import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddAvatar from './AddAvatar.png';
// import Avatar from '@material-ui/core/Avatar';
import BadgeAvatar from '../../components/Display/AddAvatarBadge';
import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import AvatarSmall from '../../components/Display/avatarSmall';
import { truncate } from 'fs';
import firebase from 'firebase';
import fb from 'firebase/app';
import { auth } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}))(Avatar);

export default function ProfileOverview(props: any) {
    const [user, setUser] = useState(auth.checkUserLoggedIn());
    useEffect(() => {
        const authU = auth.checkUserLoggedIn();
        if (authU != undefined) {
            setUser(authU);
        }
    });

    const Followers = () => {
        const [Follow, setFollow] = useState(false);
        const [color, setColor] = useState(false);
        if (!user) return null;
        const FollowingCheck = fb
            .firestore()
            .collection('users/')
            .doc(`${user['uid']}/`)
            .collection('Following')
            .doc(`${props.uid}/`)
            .get();

        if (FollowingCheck == null) {
            setFollow(false);
        } else {
            setFollow(true);
        }

        const FollowUpdate = () => {
            if (!user) return;
            setFollow(!Follow);

            const increment = fb.firestore.FieldValue.increment(1);
            const decrement = fb.firestore.FieldValue.increment(-1);

            if (Follow == true) {
                fb.firestore()
                    .collection('users/')
                    .doc(`${user['uid']}/`)
                    .collection('Following')
                    .doc(`${props.uid}/`)
                    .update({
                        UserId: props.uid,
                    });

                fb.firestore()
                    .collection('users/')
                    .doc(`${props.uid}/`)
                    .collection('Followers')
                    .doc(`${user['uid']}/`)
                    .update({
                        UserId: user['uid'],
                    });

                fb.firestore().collection('users/').doc(`${user['uid']}/`).update({
                    Following: increment,
                });

                fb.firestore().collection('users/').doc(`${props.uid}/`).update({
                    Followers: increment,
                });
            } else {
                fb.firestore()
                    .collection('users/')
                    .doc(`${user['uid']}/`)
                    .collection('Following')
                    .doc(`${props.uid}/`)
                    .delete();
                fb.firestore()
                    .collection('users/')
                    .doc(`${props.uid}/`)
                    .collection('Followers')
                    .doc(`${user['uid']}/`)
                    .delete();

                fb.firestore().collection('users/').doc(`${user['uid']}/`).update({
                    Following: decrement,
                });

                fb.firestore().collection('users/').doc(`${props.uid}/`).update({
                    Followers: decrement,
                });
            }
        };

        // const [Follow, setFollowed] = useState('Follow');

        return (
            <Button
                variant="contained"
                // style={{
                //     padding: '5px 10px 5px 10px',
                //     marginRight: '5px',
                //     borderRadius: '20px',
                //     float: 'right',
                //     background: '#f56920',
                //     color: '#fafafa',
                // }}
                style={
                    !color
                        ? {
                              padding: '5px 10px 5px 10px',
                              marginRight: '5px',
                              borderRadius: '20px',
                              float: 'right',
                              background: '#f56920',
                              color: '#fafafa',
                          }
                        : {
                              padding: '5px 10px 5px 10px',
                              marginRight: '5px',
                              borderRadius: '20px',
                              float: 'right',
                              background: '#fafafa',
                              color: '#f56920',
                          }
                }
                onClick={() => FollowUpdate()}
                onClickCapture={() => setColor(!color)}
            >
                {Follow ? <div>Following</div> : <div>Follow</div>}
            </Button>
        );
    };

    // const classes = useStyles();
    if (props.followers === true) {
        return (
            <Card
                style={{
                    background: '#1b1b1b',
                    marginLeft: '15px',
                    marginRight: '15px',
                    border: '3px solid #f56920',
                    borderRadius: '20px',
                }}
            >
                <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
                    {/* <Grid container direction="column">
                                <Grid item> */}
                    {/* <Avatar
                                style={{ float: 'right', width: '18vw', height: '18vw', marginRight: '20px' }}
                            ></Avatar> */}
                    <Grid style={{ float: 'right' }}>
                        <AvatarSmall
                            uid={props.uid}
                            User_name={props.User_name}
                            Avatar={props.Avatar}
                            Size={props.Size}
                        />
                    </Grid>
                    <Typography style={{ color: '#fafafa', fontSize: 'calc(12px + 2vw)' }}>
                        Hi,<br></br>
                    </Typography>
                    <Typography style={{ color: '#f56920', fontSize: '2vw' }}>{props.User_name}</Typography>
                    {/* </Grid>
                                <Grid item></Grid> */}
                    {/* </Grid> */}
                    <br></br>
                    {/* <Card style={{ width: 'fit-content', height: 'fit-content', padding: '-5px' }}>
                                <CardContent> */}
                    <Button style={{ padding: '1px' }}>
                        <Typography variant="button" style={{ justifyContent: 'center' }}>
                            <span style={{ color: '#fafafa' }}>2</span>
                            <br></br>
                            <span style={{ color: '#f56920' }}>posts</span>
                        </Typography>
                        {/* Number of posts by user */}
                    </Button>
                    <Button style={{ padding: '1px' }}>
                        <Typography variant="button" style={{ justifyContent: 'center' }}>
                            <span style={{ color: '#fafafa' }}>{props.User.GamePoint}</span>
                            <br></br>
                            <span style={{ color: '#f56920' }}>points</span>
                        </Typography>
                        {/* Number of posts by user */}
                    </Button>
                    {/* <Followers /> */}
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            style={{
                background: '#1b1b1b',
                marginLeft: '15px',
                marginRight: '15px',
                border: '3px solid #f56920',
                borderRadius: '20px',
            }}
        >
            <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
                {/* <Grid container direction="column">
                            <Grid item> */}
                {/* <Avatar
                            style={{ float: 'right', width: '18vw', height: '18vw', marginRight: '20px' }}
                        ></Avatar> */}
                <Grid style={{ float: 'right' }}>
                    <AvatarSmall uid={props.uid} User_name={props.User_name} Avatar={props.Avatar} Size={props.Size} />
                </Grid>
                <Typography style={{ color: '#fafafa', fontSize: 'calc(12px + 2vw)' }}>
                    Hi,<br></br>
                </Typography>
                <Typography style={{ color: '#f56920', fontSize: '2vw' }}>{props.User_name}</Typography>
                {/* </Grid>
                            <Grid item></Grid> */}
                {/* </Grid> */}
                <br></br>
                {/* <Card style={{ width: 'fit-content', height: 'fit-content', padding: '-5px' }}>
                            <CardContent> */}
                <Button style={{ padding: '1px' }}>
                    <Typography variant="button" style={{ justifyContent: 'center' }}>
                        <span style={{ color: '#fafafa' }}>2</span>
                        <br></br>
                        <span style={{ color: '#f56920' }}>posts</span>
                    </Typography>
                    {/* Number of posts by user */}
                </Button>
                <Button style={{ padding: '1px' }}>
                    <Typography variant="button" style={{ justifyContent: 'center' }}>
                        <span style={{ color: '#fafafa' }}>{props.User.GamePoint}</span>
                        <br></br>
                        <span style={{ color: '#f56920' }}>points</span>
                    </Typography>
                    {/* Number of posts by user */}
                </Button>
            </CardContent>
        </Card>
    );
}
