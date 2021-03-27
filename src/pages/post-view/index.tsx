/* eslint-disable no-lone-blocks */
import { Grid, Card, Typography, IconButton, Divider, Box } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import fb from 'firebase/app';
import { Component } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SharePost from '../../components/Display/sharePost';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AvatarSmall from '../../components/Display/avatarSmall';
import EditButton from '../../components/Display/edit';
import ReportButton from '../../components/Display/report';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { db } from '../../firebase';
// import AvatarSmall from '.,/avatarSmall';

export interface PostViewState {
    newComment: string;
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

export interface PostViewProps {
    state?: string;
    uid?: string;
    user?: any;
}

export default class PostViewScreen extends Component<PostViewProps, PostViewState> {
    constructor(PostViewProps: any) {
        super(PostViewProps);
        this.state = {
            favourited: false,
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
        db.checkLikedPost(pid).then((e) => {
            console.log('e ', e);
            this.setState({
                favourited: e as boolean,
            });
        });
    }

    handleColorChange = () => {
        const path = window.location.pathname.split('/');
        const pid = path[path.length - 1];

        db.addOrRemoveLikeToPost(pid); // changes values in db

        // visual changes for quick response done differently
        if (!this.state.favourited) {
            let like = this.state.likes_count ? this.state.likes_count + 1 : 1;
            this.setState({ likes_count: like, favourited: true });
        } else {
            let like = this.state.likes_count ? this.state.likes_count - 1 : 0;
            this.setState({ likes_count: like, favourited: false });
        }
    };

    render() {
        const path = window.location.pathname.split('/');
        const pid = path[path.length - 1];
        // console.log(uid);
        const handleChange = (event: any) => {
            // console.log(event.target.value);
            this.setState({
                newComment: event.target.value as string,
                // user: checkUserLoggedIn(),
            });
        };

        const handleDelete = (val: any) => {
            const newC = this.state.comments.filter((item: any) => item !== val);
            this.setState({
                comments: newC,
            });
            fb.firestore()
                .collection('Posts')
                .doc(pid)
                .update({
                    comments: fb.firestore.FieldValue.arrayRemove(val),
                    comment_count: fb.firestore.FieldValue.increment(-1),
                });
        };

        const handleClick = (event: any) => {
            const FieldValue = fb.firestore.FieldValue;
            // const comment = `${this.props.user.User_name} : ${this.state.newComment}`;
            let newC = {
                id: this.props.uid,
                name: this.props.user.User_name,
                comment: this.state.newComment,
            };
            // newC[this.state.uid] =  this.state.newComment;

            // setOptions(prev => {...prev, newC});
            fb.firestore()
                .collection('Posts')
                .doc(pid)
                .update({
                    comments: FieldValue.arrayUnion(newC),
                    comment_count: fb.firestore.FieldValue.increment(1),
                });
            // console.log(`${this.state.user.User_name} : ${comment}`);
            // console.log(this.state.user);
            console.log(newC);
            this.setState({
                comments: [...this.state.comments, newC],
            });
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
                            <AvatarSmall
                                aria-label="recipe"
                                User_name={this.state.post_user.User_name}
                                Avatar={this.state.post_user.Avatar}
                                style={{ backgroundColor: 'auto' }}
                                uid={this.state.post_uid}
                                Size="small"
                            />
                        }
                        action={
                            (this.props.uid === this.state.post_uid && <EditButton postURL={pid} />) ||
                            (this.props.uid !== this.state.post_uid && <ReportButton postID={pid} />)
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
                        {/* <IconButton aria-label="share"> */}
                        <SharePost sharedURL={window.location.href} />
                        {/* </IconButton> */}
                    </CardActions>
                </Card>
                <Divider variant="middle" style={{ background: '#fafafa', margin: '10px' }} />
                <Grid container spacing={2} justify="flex-start" style={{ justifyItems: 'normal', marginLeft: '10%' }}>
                    <Grid item style={{ color: 'white', fontSize: '12' }}>
                        <Typography variant="h4" style={{ marginBottom: '20px', color: '#f56920' }}>
                            Latest comments
                        </Typography>
                        <List>
                            {this.state.comments.map((val: any, index: any) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemAvatar>
                                            <AvatarSmall
                                                User={this.props.user}
                                                uid={this.props.uid}
                                                User_name={this.props.user.User_name}
                                                Avatar={this.props.user.Avatar}
                                                Size="small"
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={val.comment} />
                                        {val.id === this.props.uid && (
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                    color="inherit"
                                                    onClick={() => handleDelete(val)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        )}
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
                <InputBase
                    onChange={handleChange}
                    placeholder="Start typing..."
                    style={{
                        width: '80%',
                        // marginRight: '-12%',
                        margin: 'auto',
                        marginTop: '20px',
                        marginBottom: '20px',
                        textDecorationColor: '#FAFAFA',
                        border: '1px solid #FAFAFA',
                        borderRadius: '10px',
                        height: '50px',
                        padding: '10px',
                        color: '#fafafa',
                    }}
                    endAdornment={
                        <IconButton
                            onClick={handleClick}
                            aria-label="upload"
                            type="submit"
                            style={{ color: '#FAFAFA', alignContent: 'end' }}
                        >
                            <PublishRoundedIcon />
                        </IconButton>
                    }
                />
                <Box m={8} />
            </Card>
        );
    }
}

{
    /* <Grid container direction="row" spacing={1} justify="center">
                    <Grid
                        item
                        justify="flex-start"
                        style={{ marginLeft: '5em', position: 'relative', marginTop: '20px' }}
                    >
                        <Avatar alt={this.state.post_user.User_name} src={this.state.post_user.Avatar}></Avatar>
                    </Grid>
                    <Grid item justify="flex-start" xs={7} style={{ marginTop: '20px' }}>
                        <Card style={{ color: '#F56920', borderRadius: '22px' }} className="boxField">
                            <Typography variant="h6" style={{ justifyContent: 'space-evenly' }}>
                                {this.state.post_user.User_name}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item justify="flex-end" style={{ position: 'relative', marginTop: '20px' }}>
                        <Card
                            style={{
                                color: '#F56920',
                                borderRadius: '22px',
                                justifyContent: 'center',
                            }}
                            className="boxField"
                        >
                            <Typography variant="body1" style={{ justifyContent: 'space-evenly' }}>
                                {this.state.post_time}
                            </Typography>
                        </Card>
                    </Grid>
                </Grid>
                <br></br>
                <Grid container spacing={2} justify="center">
                    <Container>
                        <div className="postImage" style={{ justifyItems: 'normal', marginRight: '-10%' }}>
                            <img
                                src={this.state.Image}
                                alt="not loading..."
                                // width= "80%"
                                width="600px"
                                height="500px"
                                className="postImage"
                                style={{ borderRadius: '20px 20px 0px 0px' }}
                            ></img>
                        </div>
                    </Container>
                </Grid>
                <br />
                <Grid container spacing={2} justify="center">
                    <Grid item style={{ color: 'white', fontSize: '12' }}>
                        <span>{this.state.caption}</span>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={2}
                    justify="flex-start"
                    alignItems="center"
                    style={{ justifyItems: 'normal', marginLeft: '10%' }}
                >
                    <Grid item>
                        <IconButton
                            aria-label="add to favorites"
                            style={this.state.favourited ? { color: '#dc143c' } : { color: '#FAFAFA' }}
                            onClick={this.handleColorChange}
                        >
                            <FavoriteIcon />
                            {this.state.likes_count}
                        </IconButton>
                    </Grid>
                    <Grid item xs={5}>
                        <SharePost sharedURL={window.location.href} />
                    </Grid>
                </Grid> */
}
