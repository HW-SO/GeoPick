import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import UploadIcon from '../Display/uploadIcon';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';

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
    // const classes = useStyles();
    // const [value, setValue] = React.useState('recents');

    // const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    //     setValue(newValue);
    // };

    // return (
    //     <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
    //         <BottomNavigationAction label="Home" value="Home" icon={<HomeRoundedIcon />} />
    //         <BottomNavigationAction label="Search" value="Search" icon={<SearchRoundedIcon />} />
    //         <BottomNavigationAction label="Camera" value="Add" icon={<CameraAltRoundedIcon />} />
    //         <BottomNavigationAction label="Explore" value="Explore" icon={<ExploreRoundedIcon />} />
    //         <BottomNavigationAction label="Settings" value="Settings" icon={<SettingsRoundedIcon />} />
    //     </BottomNavigation>
    // );

    
    const classes = useStyles();
    return (
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <IconButton color="inherit" aria-label="open drawer">
                    <HomeRoundedIcon />
                </IconButton>
                <IconButton color="inherit" aria-label="open drawer">
                    <SearchRoundedIcon />
                </IconButton>
                <UploadIcon/>
                <div className={classes.grow} />
                <IconButton color="inherit">
                    <ExploreRoundedIcon/>
                </IconButton>
                <IconButton color="inherit">
                    <SettingsRoundedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
