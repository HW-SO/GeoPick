import React, { useEffect, useState } from 'react';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProfileOverview from '../../components/Display/profileOverview';
import firebase from 'firebase';
import { auth } from '../../firebase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Avatar, Button, IconButton, Toolbar } from '@material-ui/core';
import { Component } from 'react';
import AvatarSmall from '../../components/Display/avatarSmall';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}



export interface TabPanelState {
    users: Array<any>;
    userstwo: Array<any>;
    userOn: boolean;
    userTwoOn: boolean;
    query: string;
    value:any;
    ComList:JSX.Element[] | undefined;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: auto,
    },
}));

export default class FullWidthTabs extends Component<{}, TabPanelState>  {
    // const [users, setUsers] = useState(Array());
    // const [userstwo, setUsersTwo] = useState(Array());

    // const [userOn, setUserOn] = useState(false);
    // const [userTwoOn, setUserTwoOn] = useState(false);

    // const [query, setQuery] = useState('');

    constructor() {
        super({});
        this.state = {
            users: [],
            userstwo: [], 
            userOn: false,
            userTwoOn: false,
            query: '',
            value:0,
            ComList: undefined,
        };
    }

    toggleUserOne = () => {
        this.setState({ComList:undefined});
        console.log("clicked")
        var user = auth.checkUserLoggedIn();
        if (!user) return;
        this.setState({userOn:true,userTwoOn:false});
        firebase
            .firestore()
            .collection('users')
            .doc(`${user.uid}/`).collection('following')
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                this.setState({users:users});
                console.log(this.state.users)
            });
    };

    toggleUserTwo = () => {
        this.setState({ComList:undefined});
        var user = auth.checkUserLoggedIn();
        if (!user) return;
        this.setState({userOn:false,userTwoOn:true});
        firebase
            .firestore()
            .collection('users')
            .doc(`${user.uid}/`).collection('followers')
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data };
                });
                this.setState({users:users});
                console.log(this.state.userstwo)
            });
    };



    // const fetchResults = (search: React.ChangeEvent<HTMLInputElement>) => {
    //     setQuery(search.target.value.toLowerCase());
    //     if (userOn) {
    //         toggleUserOne();
    //     }
    //     if (userTwoOn) {
    //         toggleUserTwo();
    //     }

    // };
    // const theme = useTheme();
    // const [value, setValue] = React.useState(0);
    // const [ComList, setComList] = React.useState<JSX.Element[]>();

     handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({value:newValue});
    };

    // const handleChangeIndex = (index: number) => {
    //     setValue(index);
    // };
     getFollowerComponent = async () => {

        
         console.log("users ", this.state.users)
        const pArray = this.state.users.map(async d => 
            await firebase.firestore().collection('users').doc(`${d.UserId}/`).get().then(snapshot => {
                var data = snapshot.data();
                if(data)
                    return data
            })
        )
        const user = await Promise.all(pArray);
        console.log(user)
        const list = user.map(u => {
            if (u) {
                console.log("user ", u)
            return <li> 
                <Button style={{width:170,marginTop:20,}} >
                    <ListItemAvatar >
                        <AvatarSmall uid={u.id}
                                User_name={u.User_name}
                                Avatar={u.Avatar}
                                Size='small'/>
                    </ListItemAvatar>
                    <ListItemText primary={u.User_name}  style={{color:'white'}}/>
                    </Button>
                </li>
            }
            else return <li>hello</li>
        })
        console.log("list ", list)
        this.setState({ComList:list});
    }

    componentDidUpdate = () => {
        if (this.state.users.length > 0 && !this.state.ComList)
            this.getFollowerComponent();
    }

    render(){
    return (
        <div>
            <AppBar position="relative" color="default">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Following" {...a11yProps(0)} onClick={this.toggleUserOne} />
                    <Tab label="Followers" {...a11yProps(1)} onClick={this.toggleUserTwo} />
                    {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                </Tabs>
            </AppBar>
            
            {/* <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            > */}
            {this.state.users && <TabPanel value={this.state.value} index={0}>
            <ul>{this.state.users.length ? this.state.ComList : null}</ul>
            </TabPanel>}

            
            {this.state.users && <TabPanel value={this.state.value} index={1} >
            <ul>{this.state.users.length ? this.state.ComList : null}</ul>
            </TabPanel>}
            {/* </SwipeableViews> */}
        
            </div>
        );
    }
}
