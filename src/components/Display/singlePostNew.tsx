import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AvatarSmall from './avatarSmall';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import SharePost from './sharePost';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import './singlePostStyles.scss';
import { checkUserLoggedIn } from '../../firebase/auth';
import firebase from 'firebase';
import fb from 'firebase/app';
import GuessTheLocationPlay from '../Game/guessPlay';
import GTLicon from '../Inputs/The pin.svg';
import { Box, Button } from '@material-ui/core';
import GTLexpanded from './GTLexpanded';
import ReportButton from './report';
import GTLmenu from '../Game/GTLmenu';
// import randomLocation from 'random-location';

export interface SinglePostNewProps {
    username?: string;
    postPic?: string;
    date?: string;
    avatar?: string;
    uid?: string;
    likes_count?: number;
    caption?: string;
    id?: string;
    sharedURL?: string;
    hidden?: boolean;
    comments_count?: number;
    location?: any;
    otherLocs?: any;
}

export interface SinglePostNewState {
    favourited: boolean;
    user: any;
    post_user: any;
    open_share: boolean;
    isOpen: boolean;
    path_name: string;
    likes: number | undefined;
    isAuthenticated: boolean;
    // location1: String;
    // location2: String;
    // location3: String;
    // questions: any;
    // displayQuestions: boolean;
    random: any;
    locations: any;
    gotLocs: boolean;
    loc1: string;
    loc2: string;
}
class SinglePostNew extends Component<SinglePostNewProps, SinglePostNewState> {
    constructor(SinglePostNewProps: any) {
        super(SinglePostNewProps);

        this.state = {
            favourited: false,
            user: checkUserLoggedIn(),
            post_user: {},
            likes: this.props.likes_count,
            open_share: false,
            isOpen: false,
            path_name: `/post/${this.props.id}`,
            isAuthenticated: false,
            gotLocs: false,
            // // questions: [{ location1: 'UAE', location2: 'Russia', location3: 'Algeria' }],
            // questions: { correctLocation: 'Dubai', Location2: 'Sharjah', Location3: 'RAK' },
            // displayQuestions: false,
            random: 1,
            locations: [],
            loc1: '',
            loc2: '',
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleClickRandomizer = this.handleClickRandomizer.bind(this);
        this.getLocations = this.getLocations.bind(this);
        this.randomizeLocations = this.randomizeLocations.bind(this);
        // this.GTLexpanded = this.GTLexpanded.bind(this);
    }
    handleClickRandomizer = () => {
        const min = 1;
        const max = 4;
        const rand = Math.floor(Math.random() * (max - min) + min);
        this.setState({ random: rand });
    };

    randomizeLocations = (locs: any) => {
        const rand1 = Math.floor(Math.random() * this.state.random);
        const rand2 = Math.floor(Math.random() * this.state.random);

        // console.log(locs);
        // while((this.state.locations.length == 0));

        //   return (this.state.locations[rand1])
        this.setState({ loc1: this.state.locations[rand1], loc2: this.state.locations[rand2] });
    };
    handleColorChange = () => {
        this.setState({
            favourited: !this.state.favourited,
        });

        const increment = fb.firestore.FieldValue.increment(1);
        const decrement = fb.firestore.FieldValue.increment(-1);

        if (this.state.favourited === false) {
            console.log(this.props.id); //undefined
            fb.firestore().collection('Posts').doc(this.props.id).update({
                likes_count: increment,
            });
            let like = this.state.likes ? this.state.likes + 1 : 0;
            this.setState({ likes: like });
        } else {
            fb.firestore().collection('Posts').doc(this.props.id).update({
                likes_count: decrement,
            });
            let like = this.state.likes ? this.state.likes - 1 : 0;
            this.setState({ likes: like });
        }
    };
    share_area = React.createRef();

    componentDidMount() {
        this.getUser().then(
            (user) => {
                this.setState({ isAuthenticated: true, post_user: user });
            },
            (error) => {
                this.setState({ isAuthenticated: true });
            },
        );

        this.getLocations(this.props.location).then(
            (locs) => {
                this.setState({ gotLocs: true, locations: locs });
                this.randomizeLocations(locs);
            },
            (error) => {
                this.setState({ gotLocs: false });
            },
        );

        // this.getLocations(this.props.location);
        // const loc = this.props.location

        // console.log(this.state.locations);
        // const loc = []

        // console.log(this.state.locations)
    }

    getLocations = (loc: string) => {
        var locs = new Array();

        return new Promise((resolve, reject) => {
            let locs = new Array();
            const snapshot = firebase
                .firestore()
                .collection('Posts')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (!locs.includes(doc.data().location) && loc != doc.data().location) {
                            locs.push(doc.data().location);
                        }
                    });
                    resolve(locs);
                })
                .catch((error) => {
                    reject(error);
                });
        });

        return new Promise(function (resolve, reject) {
            firebase
                .firestore()
                .collection('Posts')
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (!locs.includes(doc.data().location) && loc != doc.data().location) {
                            locs = [...locs, doc.data().location];
                        }
                    });
                });
            if (locs) {
                resolve(locs);
            } else {
                reject('not loading locations');
            }
        });
    };

    getUser = () => {
        const uid = this.props.uid;
        return new Promise(function (resolve, reject) {
            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((querySnapshot) => {
                    const data = querySnapshot.data();
                    if (data) {
                        resolve(data);
                    } else {
                        reject('User not authenticated');
                    }
                });
        });
    };

    handleButtonClick = () => {
        this.setState((state) => {
            return {
                open_share: !state.open_share,
            };
        });
    };

    // GTLexpanded = () => {
    //     this.setState((state) => {
    //         return { displayQuestions: !this.state.displayQuestions };
    //     });
    // };

    render() {
        // const classes = useStyles();
        const path = window.location.href.split('/');
        const root = path[path.length - 2];

        // let questions = null;
        // if (this.state.displayQuestions) {
        //     console.log("Entered GTL")
        //     return (questions = (
        //         <div>

        //         </div>
        //     ));
        // }
        if (!this.state.isAuthenticated) return null;
        if (!this.state.gotLocs) return null;
        return (
            <Card
                style={{
                    maxHeight: 800,
                    maxWidth: 600,
                    margin: 'auto',
                    marginBlock: '20px',
                    background: '#1b1b1b',
                    // border: '3px solid #fafafa',
                    borderRadius: '20px',
                }}
            >
                <CardHeader
                    avatar={
                        <AvatarSmall
                            aria-label="recipe"
                            User_name={this.state.post_user.User_name}
                            Avatar={this.state.post_user.Avatar}
                            style={{ backgroundColor: 'auto' }}
                            uid={this.props.uid}
                            Size="small"
                        />
                        //     {this.state.post_user.User_name}
                        // </AvatarSmall>
                    }
                    action={
                        <>
                            {/* <IconButton aria-label="settings" style={{ color: '#fafafa' }}>
                                <MoreVertIcon />
                            </IconButton> */}
                            <ReportButton />
                        </>
                    }
                    title={<Typography variant="h6">{this.state.post_user.User_name}</Typography>}
                    subheader={
                        <Typography style={{ color: '#fafafa', fontSize: '10px' }}>{this.props.date}</Typography>
                    }
                    style={{ textAlign: 'left', color: '#fafafa' }}
                />
                <CardMedia
                    image={this.props.postPic}
                    title={`A Photo by ${this.state.post_user.User_name}`}
                    style={{
                        borderRadius: '20px 20px 20px 20px',
                        height: 0,
                        paddingTop: '56.25%',
                        marginLeft: '10px',
                        marginRight: '10px',
                    }}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                        style={{ color: '#fafafa', textAlign: 'center' }}
                    >
                        {this.props.caption}
                    </Typography>
                </CardContent>
                <Box m={-2} />
                <CardActions disableSpacing>
                    <IconButton
                        aria-label="add to favorites"
                        style={this.state.favourited ? { color: '#dc143c' } : { color: '#FAFAFA' }}
                        onClick={this.handleColorChange}
                    >
                        <FavoriteIcon />
                        {<Typography style={{ color: '#fafafa' }}>{this.state.likes}</Typography>}
                    </IconButton>
                    <Link to={{ pathname: `/post/${this.props.id}`, state: this.props.uid }}>
                        <IconButton aria-label="add a comment" style={{ color: '#FAFAFA', position: 'relative' }}>
                            <AddCommentRoundedIcon />
                            <span>
                                {<Typography style={{ color: '#fafafa' }}>{this.props.comments_count}</Typography>}
                            </span>
                        </IconButton>
                    </Link>
                    <Box m={1} />
                    <IconButton aria-label="share">
                        <SharePost sharedURL={`${root}${this.state.path_name}`} />
                    </IconButton>
                    <div
                        style={{ float: 'right', marginRight: '10px', marginLeft: 'auto' }}
                        onClick={this.handleClickRandomizer}
                    >
                        <GTLmenu
                            location2={this.state.loc1}
                            correctLocation={this.props.location}
                            location3={this.state.loc2}
                            order={this.state.random}
                            uid={this.props.uid}
                        />
                    </div>

                    {/* {this.state.displayQuestions &&
                        this.state.questions.map( 
                            (item: any) => (location1: String, location2: String, location3: String) => {
                                console.log('Entered GTL');
                                return (
                                    <div key={item}>
                                        <GTLexpanded
                                            location1={location1}
                                            location2={location2}
                                            location3={location3}
                                        />
                                    </div>
                                );
                            },
                        )}
                    {!this.state.displayQuestions && (
                    <Button
                        style={{
                            padding: '5px 20px 5px 20px',
                            // position: 'static',
                            // // float: 'right',
                            // right: '200px',
                            marginLeft: 'auto',
                            marginRight: '3px',
                            background: '#202020',
                            color: '#F56920',
                            borderRadius: '20px',
                            fontSize: '10px',
                        }}
                        onClick={this.GTLexpanded} ////////BUGGY LINE: do not uncomment until debugged/////////
                        variant="contained"
                        endIcon={<img src={GTLicon} alt="GeoPin"></img>}
                    >
                        Guess The
                        <br></br>
                        Location
                    </Button>
                    )} */}

                    {/* <div>{questions}</div> */}
                    {/* <div>
                        <GuessTheLocationPlay city1="Dubai" city2="Paris" city3="Tokyo" />
                    </div> */}

                    {/* <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton> */}
                </CardActions>
            </Card>
        );
    }
}
export default SinglePostNew;
