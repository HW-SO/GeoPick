import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { Component } from 'react';
import TextField from '../../components/Inputs/TextField';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import OccupationSelect from '../../components/Inputs/occupation';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import ReactDOM from 'react-dom';
import BadgeAvatar from '../../components/Display/AddAvatarBadge';
import firebase from 'firebase';
import Compress from 'react-image-file-resizer';
import { storage } from '../../firebase/firebase';

export interface EditProfileProps {
    uid?: string;
    user?: any;
}

export interface EditProfileState {}

class EditProfile extends Component<EditProfileProps, EditProfileState> {
    signOut = () => {
        auth.doSignOut();
    };

    handleonclickSubmit() {
        console.log('Profile edit changes!');
        //     .then(() => {
        //     push('/welcome');
        // });
    }
    handleonclickChangePassword() {
        console.log('Go to change password screen!');
        // push('/ReSet-password'); CHECK
    }

    changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        const file = await event.target.files[0];
        const image = new Image();
        let fr = new FileReader();

        fr.onload = async function () {
            if (fr !== null && typeof fr.result == 'string') {
                image.src = fr.result;
                console.log('in frload');
                console.log('frwidg', image.width);
                console.log('frhigg', image.height);
            }
        };
        fr.readAsDataURL(file);

        var width = 0;
        var height = 0;

        image.onload = function () {
            height = image.height;
            width = image.width;
        };

        setTimeout(() => {
            Compress.imageFileResizer(
                file,
                width,
                height,
                'JPEG',
                50,
                0,
                async (uri) => {
                    if (typeof uri === 'string') {
                        const urinew = uri.split('base64,')[1];
                        storage
                            .ref(`/Images/${this.props.uid}/Avatar/${file.name}`)
                            .putString(urinew, 'base64')
                            .then((data) => {
                                data.ref.getDownloadURL().then((url) => {
                                    this.setState({ imgurl: url });
                                    firebase.firestore().collection('users/').doc(`${this.props.uid}/`).update({
                                        Avatar: url,
                                    });
                                });
                            });
                    }
                },
                'base64',
            );
        }, 2500);
    }

    render() {
        return (
            <div style={{ background: '#1b1b1b', height: 'auto', paddingBottom: '5em' }}>
                <img
                    src={WhiteLogo}
                    alt="GeoPicK"
                    style={{ width: '200px', height: '66px', margin: 'auto', paddingBottom: '1em' }}
                />
                <Card
                    style={{
                        background: '#1b1b1b',
                        marginLeft: '15px',
                        marginRight: '15px',
                        border: '3px solid #f56920',
                        borderRadius: '20px',
                        marginBottom: '20px',
                        maxWidth: '600px',
                        margin: 'auto',
                        paddingBottom: '1em',
                    }}
                >
                    <BadgeAvatar src={this.props.user.Avatar} onChange={this.changeAvatar} />
                    {/* <Avatar
                        style={{
                            float: 'right',
                            width: '120px',
                            height: '120px',
                            marginRight: '20px',
                            marginTop: '20px',
                        }}
                    ></Avatar> */}
                    <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
                        {/* <Grid container direction="column">
                    <Grid item> */}

                        <Typography variant="h3" style={{ color: '#fafafa' }}>
                            Hi
                            </Typography><br></br>
                            {
                                <Typography variant="h4" style={{ color: '#f56920' }}>
                                    {this.props.user.User_name}
                                </Typography>
                            }
                            {/* The username comes here */}
                        
                    </CardContent>
                    <div style={{ margin: '20px', textAlign: 'center' }}>
                        <Box m={2}></Box>
                        <TextField label="Name" color="primary"></TextField>
                        <Box m={2}></Box>
                        <TextField
                            label="Something about yourself..."
                            color="primary"
                            multiline
                            rows={1}
                            rowsMax={4}
                        ></TextField>
                    </div>
                    <Box m={3}></Box>
                    <Button
                        onClick={this.handleonclickSubmit}
                        style={{
                            background: '#f56920',
                            color: '#fafafa',
                            padding: '10px 20px 10px 20px',
                            margin: 'auto',
                            borderRadius: '20px',
                            marginTop: '20px',
                            // marginBottom: '25px',
                        }}
                    >
                        Submit changes
                    </Button>

                    <Box m={3}></Box>
                    <Divider style={{ background: '#f56920' }} />
                    <Box m={2}></Box>
                    <Typography variant="body2" style={{ color: '#fafafa' }}>
                        looking for something else?
                    </Typography>
                    <Box m={-1}></Box>
                    <Button
                        onClick={this.handleonclickChangePassword}
                        style={{
                            // background: '#f56920',
                            border: '3px solid #f56920',
                            color: '#fafafa',
                            padding: '10px 20px 10px 20px',
                            margin: 'auto',
                            borderRadius: '20px',
                            marginTop: '20px',
                            // marginBottom: '5px',
                        }}
                    >
                        Change Password
                    </Button>
                    <br></br>
                    <Box m={-1.5}></Box>
                    <Button
                        style={{
                            background: '#2f4858',
                            color: '#fafafa',
                            padding: '10px 20px 10px 20px',
                            margin: 'auto',
                            borderRadius: '20px',
                            marginTop: '20px',
                        }}
                        onClick={this.signOut}
                    >
                        <Link to="/welcome">
                            <Typography variant="button" style={{ color: '#fafafa' }}>
                                Sign Out
                            </Typography>
                        </Link>
                    </Button>
                </Card>
            </div>
        );
    }
}

export default EditProfile;

class Username extends React.Component {
    state = { value: '' };

    changeValue(value) {
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        return <h1>{value}</h1>;
    }
}

function App() {
    function clickHandler() {}

    return (
        <div>
            <button onClick={clickHandler}>Change Username</button>
            <input type="text" />
            <Username />
        </div>
    );
}

document.body.innerHTML = "<div id='root'></div>";
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

class editAvatar extends React.Component {
    constructor(props) {
        super(props);
        const src = './example/einshtein.jpg';
        this.state = {
            preview: null,
            src,
        };
        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
    }

    onClose() {
        this.setState({ preview: null });
    }

    onCrop(preview) {
        this.setState({ preview });
    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 71680) {
            alert('File is too big!');
            elem.target.value = '';
        }
    }

    render() {
        return <div></div>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
