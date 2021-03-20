/* eslint-disable no-lone-blocks */
import { Avatar, Grid, Card, Typography, IconButton } from '@material-ui/core';
import * as React from 'react';
import fb from 'firebase/app';
import { Component } from 'react';
import { checkUserLoggedIn } from '../../firebase/auth';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SharePost from '../../components/Display/sharePost';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import { Link } from 'react-router-dom';

export interface DeletePostViewState {
    newComment: string;
    user: any;
    Image: string;
    caption: string;
    likes_count: number;
    post_time: string;
    user_name: string;
    favourited: boolean;
    post_uid: string;
    post_user: any;
    comments: any;
}

export interface DeletePostViewProps {
    state: string;
}

export default class DeletePostViewScreen extends Component<DeletePostViewProps, DeletePostViewState> {
    constructor(PostViewProps: any) {
        super(PostViewProps);
        this.state = {
            favourited: false,
            user: {},
            Image: '',
            caption: '',
            likes_count: 0,
            post_time: '',
            user_name: '',
            newComment: '',
            post_uid: '',
            post_user: {},
            comments: [],
        };
        this.handleColorChange = this.handleColorChange.bind(this);
    }

    async componentDidMount() {
        const path = window.location.pathname.split('/');
        const pid = path[path.length - 1];
        const auth = checkUserLoggedIn();
        // console.log(pid);
        if (auth === undefined) {
        } else {
            fb.firestore()
                .collection('users')
                .doc(auth.uid)
                .get()
                .then((querySnapshot) => {
                    const data = querySnapshot.data();
                    // console.log(data);
                    this.setState({
                        user: data,
                    });
                });
        }

        await fb
            .firestore()
            .collection('Posts')
            .doc(pid)
            .get()
            .then((doc) => {
                // console.log(doc.data());
                const data = doc.data();
                if (data) {
                    this.setState({
                        Image: data.Image,
                        caption: data.caption,
                        likes_count: data.likes_count,
                        post_time: new Date(data.post_time.seconds * 1000).toLocaleDateString('en-US'),
                        user_name: data.user_name,
                        post_uid: data.uid,
                        comments: data.comments,
                    });
                }
            });

        console.log(this.state.post_uid);
        fb.firestore()
            .collection('users')
            .doc(this.state.post_uid)
            .get()
            .then((querySnapshot) => {
                const data = querySnapshot.data();
                // console.log(data);
                this.setState({
                    post_user: data,
                });
            });

        this.setState({
            favourited: false,
        });
    }

    handleColorChange = () => {
        const path = window.location.pathname.split('/');
        const pid = path[path.length - 1];
        this.setState({
            favourited: !this.state.favourited,
        });

        const increment = fb.firestore.FieldValue.increment(1);
        const decrement = fb.firestore.FieldValue.increment(-1);

        if (this.state.favourited === false) {
            fb.firestore().collection('Posts').doc(pid).update({
                likes_count: increment,
            });
            this.setState({
                likes_count: this.state.likes_count + 1,
            });
        } else {
            fb.firestore().collection('Posts').doc(pid).update({
                likes_count: decrement,
            });
            this.setState({
                likes_count: this.state.likes_count - 1,
            });
        }
    };

    render() {
        const path = window.location.pathname.split('/');
        const pid = path[path.length - 1];

        const deletepost = (event: any) => {
            fb.firestore().collection('Posts').doc(pid).delete().then(() => {
                console.log("post deleted successfully" + pid);
            }).catch((err) => {
                console.log("error:",err)
            })
        };

        return (
            <Card
                style={{
                    background: '#1b1b1b',
                    justifyContent: 'center',
                    alignContent: 'center',
                    margin: 'auto',
                    width: 'auto',
                    padding: 'auto',
                }}
            >
                <Card
                    style={{
                        maxHeight: 800,
                        maxWidth: 600,
                        margin: 'auto',
                        marginBlock: '20px',
                        background: '#1b1b1b',
                        borderRadius: '20px',
                    }}
                >
                    <CardHeader
                        color="#fafafa"
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
                            <Typography style={{ color: '#fafafa', fontSize: '10px' }}>
                                {this.state.post_time}
                            </Typography>
                        }
                        style={{ textAlign: 'left', color: '#fafafa' }}
                    />
                    <CardMedia
                        image={this.state.Image}
                        title="Paella dish"
                        style={{
                            borderRadius: '20px 20px 20px 20px',
                            height: 0,
                            paddingTop: '56.25%',
                            marginLeft: '10px',
                            marginRight: '10px',
                        }}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p" style={{ color: '#fafafa' }}>
                            {this.state.caption}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton
                            aria-label="add to favorites"
                            style={this.state.favourited ? { color: '#dc143c' } : { color: '#FAFAFA' }}
                            onClick={this.handleColorChange}
                        >
                            <FavoriteIcon />
                            {<Typography style={{ color: '#fafafa' }}>{this.state.likes_count}</Typography>}
                        </IconButton>
                        <IconButton aria-label="share">
                            <SharePost sharedURL={window.location.href} />
                        </IconButton>
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
               
            
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                <Link to={{ pathname: `/user/${this.state.post_uid}`, state: this.state.post_uid }}>

                    <RegularBtn onClick={deletepost} type="submit" colorType="orange" style={{ width: '40%', borderRadius: '15px' }}>
                        delete post
                    </RegularBtn>
                </Link>
                </Grid>
           
            </Card>
        );
    }
}

{
}
