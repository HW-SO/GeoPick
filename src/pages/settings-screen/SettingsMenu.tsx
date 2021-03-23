import * as React from 'react';
import Card from '../../components/Layouts/Card';
import { Component } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import { Grid, Typography, Box } from '@material-ui/core';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import './styles.scss';
import { checkUserLoggedIn } from '../../firebase/auth';
import { Avatar, IconButton, Toolbar } from '@material-ui/core';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import NotificationImportantRoundedIcon from '@material-ui/icons/NotificationImportantRounded';
import AccessibilityNewRoundedIcon from '@material-ui/icons/AccessibilityNewRounded';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import GavelRoundedIcon from '@material-ui/icons/GavelRounded';
import { useHistory } from "react-router-dom";
export interface SettingsMenuProps { }
export interface SettingsMenuState {
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
    const classes = useStyles();

    // function HomeButton() {
    //     let history = useHistory();

    function onClick(e: any) {
         e.preventDefault();
        
     }

    const history = useHistory();


    return (
        <div style={{ width: '100%', height: '100%' }}>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
                <ListItem button>
                    <ListItemAvatar>
                        <Avatar style={{ background: '#fafafa' }}>
                            <AccountCircleRoundedIcon style={{ color: 'black' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Account Settings" onClick={e => { history.push("/AccountSetting") }}/>
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemAvatar>
                        <Avatar style={{ background: '#fafafa' }}>
                            <NotificationImportantRoundedIcon style={{ color: 'black' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Notification Settings" onClick={e => { history.push("/notificationset") }}/>
                </ListItem>
                <ListItem button divider>
                    <ListItemAvatar>
                        <Avatar style={{ background: '#fafafa' }}>
                            <AccessibilityNewRoundedIcon style={{ color: 'black' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Accessibility Settings" onClick={e => { history.push("/accessibility") }}/>
                </ListItem>
                <ListItem button divider>
                    <ListItemAvatar>
                        <Avatar style={{ background: '#fafafa' }}>
                            <HelpRoundedIcon style={{ color: 'black' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Help and Feedback" onClick={e => { history.push("/helpnfeedback") }} />
                </ListItem>
                <ListItem button divider>
                    <ListItemAvatar>
                        <Avatar style={{ background: '#fafafa' }}>
                            <GavelRoundedIcon style={{ color: 'black' }} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Terms and Conditions" onClick={e => { history.push("/terms") }}/>
                </ListItem>
            </List>
            <Box m={5} />
            <div>
                <Typography variant="body1" style={{ color: '#1b1b1b', textAlign: 'center' }}>
                    Designed <span style={{ color: '#f56920' }}>& </span> Developed by<br></br>The Geo
                    <span style={{ color: '#f56920' }}>Pic</span>K team.
                </Typography>
            </div>
        </div>
    );
};

export default class SettingsMenuScreen extends Component<SettingsMenuProps, SettingsMenuState> {
    constructor(SettingsMenuProps: any) {
        super(SettingsMenuProps);
        this.state = {
            user: checkUserLoggedIn(),
        };
    }
    render() {
        return (
            <div style={{ background: '#1b1b1b' }} className="bgg">

                <div style={{ color: '#fafafa' }}>
                    <Card background="#fafafa" title="Settings" split={1}>
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
