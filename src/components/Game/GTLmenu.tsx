import React, { useEffect } from 'react';
import { Menu, MenuItem, MenuHeader } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import { Button, Typography } from '@material-ui/core';
import GTLicon from '../Inputs/The pin.svg';
import fb from 'firebase/app';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { db } from '../../firebase';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function GTLmenus(props: {
    correctLocation: String;
    location2: String;
    location3: String;
    order: Number;
    uid?: string;
    pid: string;
}): JSX.Element {
    const [openCorrect, setOpenCorrect] = React.useState(false);
    const [openWrong, setOpenWrong] = React.useState(false);
    const [played, setPlayed] = React.useState(true);

    const handleClickRightAns = () => {
        if (props.uid !== undefined) {
            console.log('playing');
            db.userPlay(props.pid, 10).then((p) => {
                setPlayed(p);
            });
        }
        setOpenCorrect(true);
    };

    const handleCloseRightAns = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenCorrect(false);
    };

    useEffect(() => {
        db.didUserPlay(props.pid).then((p) => {
            setPlayed(p);
        });
    });

    const handleClickWrongAns = () => {
        console.log('wrong');
        if (props.uid !== undefined) {
            db.userPlay(props.pid, -5).then((p) => setPlayed(p));

            setOpenWrong(true);
        }
    };

    const handleCloseWrongAns = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenWrong(false);
    };

    if (played) return <></>;
    if (props.order === 1) {
        return (
            <>
                <Menu
                    styles={{
                        background: '#1b1b1b',
                        color: '#fafafa',
                        width: '80%',
                        borderRadius: '20px',
                        border: '2px solid #F56920',
                    }}
                    menuButton={
                        <Button
                            style={{
                                padding: '5px 20px 5px 20px',
                                // position: 'static',
                                float: 'right',
                                // right: '200px',
                                marginLeft: 'auto',
                                marginRight: '10px',
                                background: '#202020',
                                color: '#F56920',
                                borderRadius: '20px',
                                fontSize: '10px',
                                width: '160px',
                                borderColor: 'solid 3px #F56920',
                            }}
                            variant="contained"
                            endIcon={<img src={GTLicon} alt="GeoPin"></img>}
                        >
                            <Typography variant="caption" style={{ fontSize: '9px' }}>
                                Guess The Location
                            </Typography>
                        </Button>
                    }
                    direction="top"
                    overflow="hidden"
                >
                    <MenuHeader color="primary">
                        <Typography variant="caption" style={{ color: '#f56920' }}>
                            Pick a place
                        </Typography>
                    </MenuHeader>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickRightAns}
                        >
                            {props.correctLocation}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location2}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location3}
                        </Button>
                    </MenuItem>
                </Menu>
                <Snackbar
                    open={openCorrect}
                    autoHideDuration={2000}
                    onClose={handleCloseRightAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseRightAns}
                        severity="success"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        Woohoo! +10! You guessed the right location!👏
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openWrong}
                    autoHideDuration={2000}
                    onClose={handleCloseWrongAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseWrongAns}
                        severity="error"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        sorry, you guessed it wrong! -5 😞 Better luck next time👍
                    </Alert>
                </Snackbar>
            </>
        );
    } else if (props.order === 2) {
        return (
            <>
                <Menu
                    styles={{
                        background: '#1b1b1b',
                        color: '#fafafa',
                        width: '80%',
                        borderRadius: '20px',
                        border: '2px solid #F56920',
                    }}
                    menuButton={
                        <Button
                            style={{
                                padding: '5px 20px 5px 20px',
                                // position: 'static',
                                float: 'right',
                                // right: '200px',
                                marginLeft: 'auto',
                                marginRight: '10px',
                                background: '#202020',
                                color: '#F56920',
                                borderRadius: '20px',
                                fontSize: '10px',
                                width: '160px',
                                borderColor: 'solid 3px #F56920',
                            }}
                            variant="contained"
                            endIcon={<img src={GTLicon} alt="GeoPin"></img>}
                        >
                            <Typography variant="caption" style={{ fontSize: '9px' }}>
                                Guess The Location
                            </Typography>
                        </Button>
                    }
                    direction="top"
                    overflow="hidden"
                >
                    <MenuHeader color="primary">
                        <Typography variant="caption" style={{ color: '#f56920' }}>
                            Pick a place
                        </Typography>
                    </MenuHeader>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location2}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickRightAns}
                        >
                            {props.correctLocation}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location3}
                        </Button>
                    </MenuItem>
                </Menu>
                <Snackbar
                    open={openCorrect}
                    autoHideDuration={2000}
                    onClose={handleCloseRightAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseRightAns}
                        severity="success"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        Woohoo! +10! You guessed the right location!👏
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openWrong}
                    autoHideDuration={2000}
                    onClose={handleCloseWrongAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseWrongAns}
                        severity="error"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        sorry, you guessed it wrong! -5 😞 Better luck next time👍
                    </Alert>
                </Snackbar>
            </>
        );
    } else {
        return (
            <>
                <Menu
                    styles={{
                        background: '#1b1b1b',
                        color: '#fafafa',
                        width: '80%',
                        borderRadius: '20px',
                        border: '2px solid #F56920',
                    }}
                    menuButton={
                        <Button
                            style={{
                                padding: '5px 20px 5px 20px',
                                // position: 'static',
                                float: 'right',
                                // right: '200px',
                                marginLeft: 'auto',
                                marginRight: '10px',
                                background: '#202020',
                                color: '#F56920',
                                borderRadius: '20px',
                                fontSize: '10px',
                                width: '160px',
                                borderColor: 'solid 3px #F56920',
                            }}
                            variant="contained"
                            endIcon={<img src={GTLicon} alt="GeoPin"></img>}
                        >
                            <Typography variant="caption" style={{ fontSize: '9px' }}>
                                Guess The Location
                            </Typography>
                        </Button>
                    }
                    direction="top"
                    overflow="hidden"
                >
                    <MenuHeader color="primary">
                        <Typography variant="caption" style={{ color: '#f56920' }}>
                            Pick a place
                        </Typography>
                    </MenuHeader>

                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location2}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickWrongAns}
                        >
                            {props.location3}
                        </Button>
                    </MenuItem>
                    <MenuItem styles={{ background: '#1b1b1b', color: '#fafafa', borderRadius: '20px' }}>
                        <Button
                            style={{
                                // marginLeft: '3px',
                                // marginRight: '3px',
                                textAlign: 'center',
                                fontSize: '10px',
                                marginBottom: '5px',
                                background: '#fafafa',
                                width: '90%',
                                borderRadius: '20px',
                                margin: 'auto',
                            }}
                            onClick={handleClickRightAns}
                        >
                            {props.correctLocation}
                        </Button>
                    </MenuItem>
                </Menu>
                <Snackbar
                    open={openCorrect}
                    autoHideDuration={2000}
                    onClose={handleCloseRightAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseRightAns}
                        severity="success"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        Woohoo! You guessed the right location!👏
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openWrong}
                    autoHideDuration={2000}
                    onClose={handleCloseWrongAns}
                    style={{ marginBottom: '50px' }}
                >
                    <Alert
                        onClose={handleCloseWrongAns}
                        severity="error"
                        style={{ borderRadius: '20px', minWidth: '250px' }}
                    >
                        sorry, you guessed it wrong!😞 Better luck next time👍
                    </Alert>
                </Snackbar>
            </>
        );
    }
    return <></>;
}
