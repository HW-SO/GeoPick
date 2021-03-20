import * as React from 'react';
import './styles.scss';
import { auth } from '../../firebase';
import { useHistory } from 'react-router-dom';
import WhiteLogo from './WhiteLogo.svg';
import googleButton from './googleButton.svg';
// import background from './welcome-pg.png';
import { Grid, Typography } from '@material-ui/core';

import { RegularBtn } from '../../components/Buttons/RegularBtn';
interface WelcomeProps {}

const WelcomeScreen: React.FunctionComponent<WelcomeProps> = (props) => {
    // const classes = useStyles();
    /* var config={
   apiKey:"",
   authDomain:"",
   databaseURL:"",
   project:"",
   storeageBucket:"",
   messageingSenderid:""
};*/ const {
        push,
    } = useHistory();
    const GoogleSignin = () => {
        auth.doGoogleSignUp()
            .then((u) => {
                if (u.additionalUserInfo?.isNewUser) {
                    push('/create-profile');
                } else {
                    push('/home');
                }
            })
            .catch((error) => {
                console.log(error);
                window.alert('Failed to login');
            });
    };

    const history = useHistory();

    return (
                <div className="welcomepg">
                    <Grid container spacing={10} direction="column" alignItems="center" justify="center">
                        <Grid item>
                            <img src={WhiteLogo} alt="GeoPicK Logo" />
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                        </Grid>
                        <Grid item>
                            <Typography variant="h3" align="center">
                                <span>A tool for</span>
                                <br></br>shutterbugs!
                            </Typography>
                        </Grid>
                        <Grid container spacing={3} direction="column" alignItems="center" justify="center">
                            <Grid
                                item
                                xs={2}
                                style={{ verticalAlign: 'true' }}
                            ></Grid>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Grid item>
                                    <span style={{ color: '#fafafa' }}>New to GeoPicK?</span>
                                    <br />
                                    <br />
                                    <RegularBtn colorType="dark" onClick={GoogleSignin} className="g-btn">
                                        <p className="text" style={{ color: '#fafafa' }}>
                                            Sign up with{' '}
                                        </p>
                                        <img
                                            src={googleButton}
                                            width="22px"
                                            alt="Google"
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </RegularBtn>
                                    <br></br>
                                    <br />
                                    <div style={{ paddingBottom: '5%' }}>
                                        <RegularBtn
                                            colorType="orange"
                                            style={{
                                                borderRadius: '20px',
                                                width: '195px',
                                                height: '45px',
                                            }}
                                            onClick={(e) => {
                                                history.push('/sign-up');
                                            }}
                                        >
                                            <div style={{ color: '#fafafa' }}>Sign up now!</div>
                                        </RegularBtn>
                                    </div>
                                    <hr style={{ width: '500px' }} />
                                    <br></br>
                                    <div style={{ paddingBottom: '20%' }}>
                                        <RegularBtn
                                            colorType="dark"
                                            className="sign-btn1"
                                            onClick={(e) => {
                                                history.push('/sign-in');
                                            }}
                                        >
                                            Sign in
                                        </RegularBtn>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
    );
};

export default WelcomeScreen;
