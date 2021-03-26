import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import UploadIcon from '../Display/uploadIcon';
import { AppBar, IconButton, Toolbar, Box} from '@material-ui/core';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';


const useStyles = makeStyles((theme) => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(10),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        justifyContent: 'space-evenly',
        // marginTop: 20,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
}));

export default function LabelBottomNavigation() {

    const path = window.location.pathname.split('/');
    const page = path[path.length - 1];
    
    const classes = useStyles();
    return (
        <> <Box m={2} />
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Link to='/home' color="inherit">
                <IconButton aria-label="open drawer">
                    <HomeRoundedIcon />
                </IconButton>
                </Link>
                <Link to='/search' color="inherit">
                <IconButton aria-label="open drawer">
                    <SearchRoundedIcon />
                </IconButton>
                </Link>
                {/* <Link to='/upload-image'> */}
                {page !== 'upload-image' && <UploadIcon /> }
                
                {/* </Link> */}
                <div className={classes.grow} />
                <Link to='/explore' color="inherit">
                <IconButton>
                    <ExploreRoundedIcon/>
                </IconButton>
                </Link>
                <Link to='/settings' color="inherit">
                <IconButton>
                    <SettingsRoundedIcon />
                </IconButton>
                </Link>
            </Toolbar>
        </AppBar> </>
    );
}
