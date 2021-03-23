import { Card, Typography } from '@material-ui/core';
import * as React from 'react';
import { Component } from 'react';
import './Styles.scss';
import { Toolbar, AppBar } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import { Link } from 'react-router-dom';
import AvatarSmall from '../../components/Display/avatarSmall';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { checkUserLoggedIn } from '../../firebase/auth';
import firebase from 'firebase';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import { Box } from '@material-ui/core';
import UploadIcon from '../../components/Display/uploadIcon';
import TextField from '../../components/Inputs/TextField';
import Tags from '../../components/Inputs/tags';
import { auth } from '../../firebase';
import Compress from 'react-image-file-resizer';
import { storage } from '../../firebase/firebase';
import Places from '../../components/Inputs/Places';
import { Redirect } from 'react-router-dom';
export interface UploadImageProps {}

export interface UploadImageState {
    user: any;
    isAuthenticated: boolean;
    imgurl: string;
    img: any;
    caption: string;
    tags: any;
    height: number;
    width: number;
    rawurl: string;
    location: any;
    check: boolean;
    coordinates: any;
    setLocation: boolean;
    posted: boolean;
    uid: string;
}

export class UploadImage extends Component<UploadImageProps, UploadImageState> {
    constructor(UploadImageProps: any) {
        super(UploadImageProps);
        // firebase.auth().onAuthStateChanged(function(user) {
        //     this.setState({ user: user });
        // });
        this.state = {
            user: {},
            isAuthenticated: false,
            imgurl: '',
            img: {},
            caption: '',
            tags: [],
            height: 0,
            width: 0,
            rawurl: 'https://wallpapercave.com/wp/wp3597484.jpg',
            location: {},
            check: false,
            coordinates: {},
            setLocation: false,
            posted: false,
            uid: '',
        };
    }

    selectedTags = (tagses: any) => {
        this.setState({ tags: tagses });
    };

    componentDidMount() {
        this.getUser().then(
            (user) => {
                this.setState({ isAuthenticated: true, user: user });
            },
            (error) => {
                this.setState({ isAuthenticated: true });
            },
        );
    }
    signOut = () => {
        auth.doSignOut();
    };
    getUser = () => {
        const auth = checkUserLoggedIn();
        if(auth !== undefined)
        this.setState({ uid: auth.uid });
        return new Promise(function (resolve, reject) {
            if (auth === undefined) {
            } else {
                
                firebase
                    .firestore()
                    .collection('users')
                    .doc(auth.uid)
                    .get()
                    .then((querySnapshot) => {
                        const data = querySnapshot.data();
                        if (data) {
                            resolve(data);
                        } else {
                            reject('User not authenticated');
                        }
                    });
            }
        });
    };

    onSubmit = () => {
        const file = this.state.img;
        const user = auth.checkUserLoggedIn();
        const image = new Image();
        let fr = new FileReader();
        // const history = useHistory();
        if (!user) return;

        if(!this.state.setLocation){
            alert("Please select a location before submitting");
            return;
        }

        if (!this.state.check) {
            alert('You must check the condition');
            return;
        }
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
                async (uri: any) => {
                    if (typeof uri === 'string') {
                        const urinew = uri.split('base64,')[1];
                        storage
                            .ref(`/Images/${user.uid}/Posts/${file.name}`)
                            .putString(urinew, 'base64')
                            .then((data) => {
                                data.ref.getDownloadURL().then((url) => {
                                    // this.setState({ imgurl: url });
                                    firebase
                                        .firestore()
                                        .collection('Posts/')
                                        .add({
                                            Image: url,
                                            caption: this.state.caption,
                                            comments: [],
                                            comment_count: 0,
                                            likes_count: 0,
                                            uid: user.uid,
                                            username: this.state.user.User_name,
                                            post_time: new Date(),
                                            tags: this.state.tags,
                                            location: this.state.location,
                                            coordinates: this.state.coordinates,
                                            
                                        })
                                        .then(function (docRef) {
                                            console.log('Document written with ID: ', docRef.id);
                                            firebase
                                                .firestore()
                                                .collection('Posts')
                                                .doc(docRef.id)
                                                .collection('Likes')
                                                .add({});
                                            
                                        })
                                        .catch(function (error) {
                                            console.error('Error adding document: ', error);
                                        });
                                });
                                this.setState({ posted: true});
                                // console.log(this.state.imgurl);
                            });
                    }
                },
                'base64',
            );
        }, 2500);
        
        
        // this.props.history.push('/home');
        // push('/home');
        // console.log(postRef.documentID);
    };

    changeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        const file = await event.target.files[0];
        this.setState({ img: file, rawurl: URL.createObjectURL(file) });

        // console.log(this.state.img);
    };

    updateCaption = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ caption: event.target.value });
    };

    updateLocation = (address: string) => {
        this.setState({ location: address });
        // this.setState({ : event.target.value });
        this.setState({ setLocation: true});
        // console.log(this.state.location);
    };

    updateCoordinates = (coordinates: any) => {
        const coord = {
            latitude: coordinates.lat,
            longtitude: coordinates.lng,
        };
        this.setState({ coordinates: coordinates });
        // this.setState({ : event.target.value });
        // console.log(this.state.coordinates);
    };

    toggleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ check: !this.state.check });
    };

    render() {
        if(this.state.posted)
        return <Redirect to='/home' />;
        return (
            <div style={{ background: '#1b1b1b', padding: '10px' }}>
                <AppBar position="fixed" style={{ background: '#1b1b1b' }}>
                    <Toolbar style={{ position: 'relative' }}>
                        <Link to="/welcome">
                            <IconButton edge="end" onClick={this.signOut}>
                                <ExitToAppIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Link>

                        <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
                        <AvatarSmall
                            User={this.state.user}
                            uid={this.state.uid}
                            User_name={this.state.user.User_name}
                            Avatar={this.state.user.Avatar}
                            Size="small"
                        />
                    </Toolbar>
                </AppBar>
                <Typography style={{ color: '#fafafa', fontWeight: 'normal' }} variant="h2">
                    <span style={{ color: '#f56920' }}>Upload</span> Image
                </Typography>
                <Card
                    style={{
                        maxHeight: 900,
                        maxWidth: 600,
                        margin: 'auto',
                        marginBlock: '20px',
                        background: '#1b1b1b',
                        // border: '3px solid #fafafa',
                        borderRadius: '20px',
                        boxShadow: 'inherit',
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                alt={this.state.user.User_name}
                                src={this.state.user.Avatar}
                                style={{ backgroundColor: 'auto' }}
                            >
                                {this.state.user.User_name}
                            </Avatar>
                        }
                        title={<Typography variant="h6">{this.state.user.User_name}</Typography>}
                        style={{ textAlign: 'left', color: '#fafafa' }}
                    />
                    <CardMedia
                        image={this.state.rawurl}
                        title={`A Photo by ${this.state.user.User_name}`}
                        style={{
                            borderRadius: '20px 20px 20px 20px',
                            height: 0,
                            paddingTop: '56.25%',
                            marginLeft: '10px',
                            marginRight: '10px',
                        }}
                    />
                    <Box m={-2} />
                    <CardActions disableSpacing>
                        <UploadIcon onChange={this.changeImage} />
                    </CardActions>
                </Card>
                <CardContent>
                    <TextField
                        name="caption"
                        id="caption"
                        label="Enter Caption"
                        type="caption"
                        onChange={this.updateCaption}
                    />
                </CardContent>
                <CardContent>
                    <Tags selectedTags={this.selectedTags} />
                </CardContent>
                <CardContent>
                    {/* <TextField label="Add Location"> */}
                    <Places updateLocation={this.updateLocation} updateCoordinates={this.updateCoordinates} />
                    {/* </TextField> */}
                    {/* </CardContent>
                    <CardContent> */}
                    <br></br>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{
                            color: '#fafafa',
                            textAlign: 'center',
                            fontWeight: 'lighter',
                            width: '90%',
                            margin: 'auto',
                        }}
                    >
                        <label>
                            <input type="checkbox" name="Accept" required onChange={this.toggleCheck} />
                            By checking this box, you confirm that you are aware of the community guidelines and terms
                            of use. Make sure that this post doesn't contain any human face.
                        </label>
                    </Typography>
                </CardContent>
                <CardActions>
                    <RegularBtn
                        type="submit"
                        colorType="white"
                        style={{ width: '200px', borderRadius: '15px', margin: 'auto' }}
                        onClick={this.onSubmit}
                    >
                        Upload Post!
                    </RegularBtn>
                </CardActions>
                {/* <Places /> */}
            </div>
        );
    }
}
