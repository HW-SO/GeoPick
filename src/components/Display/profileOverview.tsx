import React from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core';
import AvatarSmall from '../../components/Display/avatarSmall';
import fb from 'firebase/app';
import { auth } from '../../firebase';
import { Component } from 'react';

export interface ProfileOverviewProps {
    uid?:any;
    followers?:boolean;
    User_name?:any;
    key?:any;
    Avatar?:any;
    User?:any;
    Size?:string;
}

export interface ProfileOverviewState {
    user: any;
    Follow: boolean;
    color: boolean;
}


export default class ProfileOverview extends Component<ProfileOverviewProps, ProfileOverviewState> {


    constructor(ProfileOverviewProps: any) {
        super(ProfileOverviewProps);
        
        this.state = {
            user: auth.checkUserLoggedIn(),
            Follow: false,
            color: false,
        };
    }
    componentDidMount  () {
        var a= false;
        var user = auth.checkUserLoggedIn();
        console.log(user)
        if(!user) return;
       fb
        .firestore()
        .collection('users/')
        .doc(`${user.uid}/`)
        .collection('following')
        .doc(`${this.props.uid}/`)
        .get().then(snapshot => {
            const data = snapshot.data()
            if(data){
    
               a = true
                this.setState({Follow:a,color:a})
            }
            }
        );;;
        
        // console.log(a)
    }
    // useEffect(() => {
    //     const authU = auth.checkUserLoggedIn();
    //     if (authU != undefined) {
    //         setState(authU);
    //     }
    // });
    Followers = () => {
        // const [Follow, setFollow] = useState(false);
        // const [color, setColor] = useState(false);
        

        const FollowUpdate = async () => {
            
            if (!this.state.user) return null;
            console.log(this.state.user)
            console.log(this.props.uid)
        var FollowingCheck = 
         await fb
            .firestore()
            .collection('users/')

            .doc(`${this.state.user.uid}/`)
            .collection('following')
            .doc(`${this.props.uid}/`)

            .get();
            console.log(FollowingCheck.exists)
            

        if (!FollowingCheck.exists) {
            
            this.setState({Follow:false});
        } else {
            
            this.setState({Follow:true});
        }
            if (!this.state.user) return;
            this.setState({Follow:!this.state.Follow});
            const increment = fb.firestore.FieldValue.increment(1);
            const decrement = fb.firestore.FieldValue.increment(-1);

            if (this.state.Follow === true) {
                fb.firestore()
                    .collection('users/')

                    .doc(`${this.state.user.uid}/`)
                    .collection('following')
                    .doc(`${this.props.uid}/`)
                    .set({
                        UserId: this.props.uid,

                    });

                fb.firestore()
                    .collection('users/')
                    .doc(`${this.props.uid}/`)
                    .collection('followers')
                    .doc(`${this.state.user.uid}/`)
                    .set({
                        UserId: this.state.user.uid,
                        
                    });

                fb.firestore().collection('users/').doc(`${this.state.user.uid}/`).update({

                    Following: increment,
                });

                fb.firestore().collection('users/').doc(`${this.props.uid}/`).update({
                    Followers: increment,
                });
            } else {
                fb.firestore()
                    .collection('users/')
                    .doc(`${this.state.user.uid}/`)
                    .collection('following')
                    .doc(`${this.props.uid}/`)
                    .delete();
                fb.firestore()
                    .collection('users/')
                    .doc(`${this.props.uid}/`)
                    .collection('followers')
                    .doc(`${this.state.user.uid}/`)
                    .delete();

                fb.firestore().collection('users/').doc(`${this.state.user.uid}/`).update({
                    Following: decrement,
                });

                fb.firestore().collection('users/').doc(`${this.props.uid}/`).update({
                    Followers: decrement,
                });
            }
        };

        // const [Follow, setFollowed] = useState('Follow');

        return (
            <Button
                variant="contained"
                // style={{
                //     padding: '5px 10px 5px 10px',
                //     marginRight: '5px',
                //     borderRadius: '20px',
                //     float: 'right',
                //     background: '#f56920',
                //     color: '#fafafa',
                // }}
                style={
                    !this.state.color
                        ? {
                              padding: '5px 10px 5px 10px',
                              marginRight: '5px',
                              borderRadius: '20px',
                              float: 'right',
                              background: '#f56920',
                              color: '#fafafa',
                          }
                        : {
                              padding: '5px 10px 5px 10px',
                              marginRight: '5px',
                              borderRadius: '20px',
                              float: 'right',
                              background: '#fafafa',
                              color: '#f56920',
                          }
                }
                onClick={() => FollowUpdate()}
                onClickCapture={() => this.setState({color:!this.state.color})}
            >
                {this.state.Follow ? <div>Following</div> : <div>Follow</div>}
            </Button>
        );
    };


    // const classes = useStyles();
    

    render() {
        if (this.props.followers === true) {
            // render() {
                return (
                <Card
                    style={{
                        background: '#1b1b1b',
                        marginLeft: '15px',
                        marginRight: '15px',
                        border: '3px solid #f56920',
                        borderRadius: '20px',
                    }}
                >
                    <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
                        {/* <Grid container direction="column">
                                    <Grid item> */}
                        {/* <Avatar
                                    style={{ float: 'right', width: '18vw', height: '18vw', marginRight: '20px' }}
                                ></Avatar> */}
                        <Grid style={{ float: 'right' }}>
                            <AvatarSmall
                                uid={this.props.uid}
                                User_name={this.props.User_name}
                                Avatar={this.props.Avatar}
                                Size={this.props.Size}
                            />
                        </Grid>
                        <Typography style={{ color: '#fafafa', fontSize: 'calc(12px + 2vw)' }}>
                            Hi,<br></br>
                        </Typography>
                        <Typography style={{ color: '#f56920', fontSize: '2vw' }}>{this.props.User_name}</Typography>
                        {/* </Grid>
                                    <Grid item></Grid> */}
                        {/* </Grid> */}
                        <br></br>
                        {/* <Card style={{ width: 'fit-content', height: 'fit-content', padding: '-5px' }}>
                                    <CardContent> */}
                        <Button style={{ padding: '1px' }}>
                            <Typography variant="button" style={{ justifyContent: 'center' }}>
                                <span style={{ color: '#fafafa' }}>2</span>
                                <br></br>
                                <span style={{ color: '#f56920' }}>posts</span>
                            </Typography>
                            {/* Number of posts by user */}
                        </Button>
                        <Button style={{ padding: '1px' }}>
                            <Typography variant="button" style={{ justifyContent: 'center' }}>
                                <span style={{ color: '#fafafa' }}>{this.props.User.GamePoint}</span>
                                <br></br>
                                <span style={{ color: '#f56920' }}>points</span>
                            </Typography>
                            {/* Number of posts by user */}
                        </Button>
                        <this.Followers />
                    </CardContent>
                </Card>
            );
        // }
    }
    else{
    return(
    <Card
        style={{
            background: '#1b1b1b',
            marginLeft: '15px',
            marginRight: '15px',
            border: '3px solid #f56920',
            borderRadius: '20px',
        }}
    >
        <CardContent style={{ textAlign: 'left', padding: '50px 10px 50px 10px' }}>
            {/* <Grid container direction="column">
                        <Grid item> */}
            {/* <Avatar
                        style={{ float: 'right', width: '18vw', height: '18vw', marginRight: '20px' }}
                    ></Avatar> */}
            <Grid style={{ float: 'right' }}>
                <AvatarSmall uid={this.props.uid} User_name={this.props.User_name} Avatar={this.props.Avatar} Size={this.props.Size} />
            </Grid>
            <Typography style={{ color: '#fafafa', fontSize: 'calc(12px + 2vw)' }}>
                Hi,<br></br>
            </Typography>
            <Typography style={{ color: '#f56920', fontSize: '2vw' }}>{this.props.User_name}</Typography>
            {/* </Grid>
                        <Grid item></Grid> */}
            {/* </Grid> */}
            <br></br>
            {/* <Card style={{ width: 'fit-content', height: 'fit-content', padding: '-5px' }}>
                        <CardContent> */}
            <Button style={{ padding: '1px' }}>
                <Typography variant="button" style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#fafafa' }}>2</span>
                    <br></br>
                    <span style={{ color: '#f56920' }}>posts</span>
                </Typography>
                {/* Number of posts by user */}
            </Button>
            <Button style={{ padding: '1px' }}>
                <Typography variant="button" style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#fafafa' }}>{this.props.User.GamePoint}</span>
                    <br></br>
                    <span style={{ color: '#f56920' }}>points</span>
                </Typography>
                {/* Number of posts by user */}
            </Button>
        </CardContent>
    </Card>
);
    }

} // i'll just go through the code.. one sec okkkkk

}
