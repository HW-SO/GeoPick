import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
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
}

export interface SinglePostNewState {
    favourited: boolean;
    user: any;
    post_user: any;
    open_share: boolean;
    isOpen: boolean;
    path_name: string;
    isAuthenticated: boolean;
}
class SinglePostNew extends Component<SinglePostNewProps, SinglePostNewState> {
    constructor(SinglePostNewProps: any) {
        super(SinglePostNewProps);
        this.state = {
            favourited: false,
            user: checkUserLoggedIn(),
            post_user: {},
            open_share: false,
            isOpen: false,
            path_name: `/post/${this.props.uid}`,
            isAuthenticated: false,
        };
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleColorChange = () => {
        this.setState({
            favourited: !this.state.favourited,
        });

        const increment = fb.firestore.FieldValue.increment(1);
        const decrement = fb.firestore.FieldValue.increment(-1);

        if (this.state.favourited === false) {
            fb.firestore().collection('Posts').doc(this.props.id).update({
                likes_count: increment,
            });
        } else {
            fb.firestore().collection('Posts').doc(this.props.id).update({
                likes_count: decrement,
            });
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
    }

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
    render() {
        // const classes = useStyles();
        const path = window.location.href.split('/');
        const root = path[path.length - 2];
        if (!this.state.isAuthenticated) return null;
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
                        <Avatar
                            aria-label="recipe"
                            alt={this.state.post_user.User_name}
                            src={this.state.post_user.Avatar}
                            style={{ backgroundColor: 'auto' }}
                        >
                            {this.state.post_user.User_name}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" style={{ color: '#fafafa' }}>
                            <MoreVertIcon />
                        </IconButton>
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
                        {<Typography style={{ color: '#fafafa' }}>{this.props.likes_count}</Typography>}
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
                        variant="contained"
                        endIcon={<img src={GTLicon} alt="GeoPin"></img>}
                    >
                        Guess The
                        <br></br>
                        Location
                    </Button>
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
