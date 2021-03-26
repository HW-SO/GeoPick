import * as React from 'react';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import { Grid, Typography, Box } from '@material-ui/core';
import Card from '../../components/Layouts/Card';
import { Avatar, IconButton, Toolbar } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

export interface NotificationpgProps {}

// const messaging = firebase.messaging();
// messaging.getToken({vapidKey: "BGq2mYMBmZEK69shlrMOA7v1mA_9thyQurJuVIm1R2mjMNpajXA8hzXUoGDIurEhg3Nt9otTE-Y647Fh3W_lC6Q"});

// messaging.getToken({ vapidKey: 'BGq2mYMBmZEK69shlrMOA7v1mA_9thyQurJuVIm1R2mjMNpajXA8hzXUoGDIurEhg3Nt9otTE-Y647Fh3W_lC6Q' }).then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });

export default function Notificationpg() {
    return (
        <div style={{ background: '#1b1b1b' }} className="bgg">
            {/* <Toolbar>
                    <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
            </Toolbar> */}
            <div style={{ color: '#fafafa' }}>
                <Card background="#202020" title="Notification" split={1}></Card>
            </div>
        </div>
    );
}
