import * as React from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import { Grid, Typography, Box } from '@material-ui/core';
import Card from '../../components/Layouts/Card';
import { Avatar, IconButton, Toolbar } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Redirect, useHistory } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Component } from 'react';
import { checkUserLoggedIn } from '../../firebase/auth';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { storage } from '../../firebase/firebase';
import { auth } from '../../firebase';

import { RegularBtn } from '../../components/Buttons/RegularBtn';
import SettingsIcon from '@material-ui/icons/Settings';
//import { Link} from 'react-router-dom';

export interface AccountSettingProps {}
export interface AccountSettingMenuState {
    user: any;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            // backgroundColor: theme.palette.background.paper,
            backgroundColor: '#fafafa',
        },
    }),
);

const SettingsMenu = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const history = useHistory();

    const handleCloseDelete = () => {
        setOpen(false);
        var user = checkUserLoggedIn();
        // console.log(user)

        if (user) {
            firebase
                .firestore()
                .collection('users/')
                .doc(`${user.uid}/`)
                .delete();

            var refPosts = storage.ref(`/Images/${user.uid}/Posts`);

            refPosts.listAll().then((dir) => {
                dir.items.forEach((fileRef) => {
                    firebase.storage().ref(refPosts.fullPath).child(fileRef.name).delete();
                });
            });

            var refAvatar = storage.ref(`/Images/${user.uid}/Avatar`);

            refAvatar.listAll().then((dir) => {
                dir.items.forEach((fileRef) => {
                    firebase.storage().ref(refPosts.fullPath).child(fileRef.name).delete();
                });
            });

            var Posts = firebase.firestore().collection('Posts').where('uid', '==', user.uid);
            Posts.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                });
            });

            user!!.delete().then(() => {
                console.log("user deleted from auth");
            });
            window.location.reload();
            history.push('/welcome');
        }

        // const { push } = useHistory();
        
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem button>
                    <ListItemText
                        primary="Edit Profile"
                        onClick={(e) => {
                            history.push('/EditProfile');
                        }}
                    />
                    <EditOutlinedIcon />
                </ListItem>
                <Divider />
                <ListItem button divider onClick={handleClickOpen}>
                    <ListItemText primary="Delete Users" />
                    <HighlightOffOutlinedIcon />
                </ListItem>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Delete User'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete your account permenantly?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            No
                        </Button>
                        <Button onClick={handleCloseDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <ListItem button divider>
                    <ListItemText primary="Liked Posts" />
                    <ThumbUpAltRoundedIcon />
                </ListItem>
            </List>
            <Box m={5} />
            <div>
                <Typography variant="body1" style={{ color: '#1b1b1b', textAlign: 'center' }}>
                    Designed <span style={{ color: '#f56920' }}>& </span> Developed by<br></br>The Geo
                    <span style={{ color: '#f56920' }}>Pic</span>K team.
                </Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>

                <RegularBtn
                    colorType="orange"
                    style={{ width: 'auto', borderRadius: '20px' }}
                    onClick={(e) => {
                        history.push('/settings');
                    }}
                >
                    Back to <span></span> <SettingsIcon />
                </RegularBtn>
            </div>
        </div>
    );
};

export default class AccountSetting extends Component<AccountSettingProps, AccountSettingMenuState> {
    constructor(AccountSettingProps: any) {
        super(AccountSettingProps);
        this.state = {
            user: checkUserLoggedIn(),
        };
    }
    render() {
        return (
            <div style={{ background: '#1b1b1b' }} className="bgg">
                <Toolbar>
                    <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
                    <IconButton edge="end">
                        <Avatar alt={this.state.user.User_name} src={this.state.user.Avatar} />
                    </IconButton>
                </Toolbar>
                <div style={{ color: '#fafafa' }}>
                    <Card background="#fafafa" title="Account Settings" split={1}>
                        <div style={{ color: 'black' }}>
                            <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                                <SettingsMenu />
                            </Grid>
                        </div>
                    </Card>
                </div>
                <br />
            </div>
        );
    }
}
