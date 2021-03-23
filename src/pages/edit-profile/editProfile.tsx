import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from '@material-ui/core';
import * as React from 'react';
import { Component } from 'react';
import TextField from '../../components/Inputs/TextField';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import OccupationSelect from '../../components/Inputs/occupation';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
import ReactDOM from 'react-dom';

export interface EditProfileProps {}

export interface EditProfileState {}

class EditProfile extends Component<EditProfileProps, EditProfileState> {
    signOut = () => {
        auth.doSignOut();
    };
    handleoneditAvatar(){
        console.log('Go to change avatar screen!');
        // push('/edit-Avatar');
    }

    handleonclickSubmit() {
        console.log('Profile edit changes!')
        //     .then(() => {
        //     push('/welcome');
        // });
    }
    handleonclickChangePassword() {
        console.log('Go to change password screen!');
        // push('/ReSet-password'); CHECK
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
                    <Avatar
                        style={{
                            float: 'right',
                            width: '120px',
                            height: '120px',
                            marginRight: '20px',
                            marginTop: '20px',
                        }}
                    ></Avatar>
                    <Button
                        onClick={this.handleoneditAvatar}
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
                        Edit Avatar
                    </Button>
                    <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
                        {/* <Grid container direction="column">
                    <Grid item> */}

                        <Typography variant="h3" style={{ color: '#fafafa' }}>
                            Hi<br></br>
                            {
                                <Typography variant="h4" style={{ color: '#f56920' }}>
                                    'mo.kvs_'
                                </Typography>
                            }
                            {/* The username comes here */}
                        </Typography>
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
