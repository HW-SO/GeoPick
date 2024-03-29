import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './pages/welcome screen';
import SignInScreen from './pages/sign-in screen/SignInForm';
import SignUpScreen from './pages/sign-up screen/SignupForm';
import CreateProfileScreen from './pages/create-profile-screen';
import SetNewPasswordScreen from './pages/sign-in screen/setnewpass';
import ReSetNewPasswordScreen from './pages/sign-in screen/resetpass';
import Terms from './pages/terms/index';
import { HomeScreen } from './pages/home-screen/home';
import PostViewScreen from './pages/post-view';
import EditPostViewScreen from './pages/edit-post';
import DeletePostViewScreen from './pages/delete-post';
import HelpandFeedback from './pages/helpandfeedback';
import SettingsScreen from './pages/settings-screen/SettingsMenu';
import UserPage from './pages/profile-screen/userPage';
import SearchScreen from './pages/search-page/index';
import ExploreScreen from './pages/explore-page/index';
import AvatarSmall from './components/Display/avatarSmall';
import { IconButton, Toolbar, AppBar } from '@material-ui/core';
import WhiteLogo from './pages/welcome screen/WhiteLogo.svg';
import BottomNavigation from './components/NavBar/navbar';
import { Box } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { UploadImage } from './pages/upload-image/index';
import AccessibilitySettings from './pages/accessSetting/index';
import Notification from './pages/notificationset';
import Notificationpg from './pages/notification';
import ViewPoints from './pages/view-points-screen/points';
import EditProfile from './pages/edit-profile/editProfile';
import Camera from './components/Inputs/Camera';
import ViewFollowers from './pages/followers-page/ViewFollowers';
import WebCamFun from './pages/camera/index';
import AccountSetting from './pages/AccountSetting/index';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
// import { auth } from './firebase';
import firebase from 'firebase';

function App(): JSX.Element {
    const [user, setUser] = useState({});
    const [uid, setUID] = useState('');
    const [set, setSet] = useState(false);

    useEffect(() => {
        console.log('calling effect');
        let isMounted = true; // note this flag denote mount status
        if (!set) {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    if (isMounted) {
                        getUser(user).then((u: any) => {
                            console.log('current user ' + u);
                            setUser(u);
                        });

                        // setUser(u);
                        setUID(user.uid);
                        setSet(true);
                    }
                }
            });
        }

        return () => {
            isMounted = false;
        }; // use effect cleanup to set flag false, if unmounted
    }, [set]);
    // useEffect(() => {
    //     // if(!set){

    //         // const u = auth.currentUser;
    //         // console.log("in app");
    //         // if(u !== null) {
    //         //     getUser().then(
    //         //         (user : any) => {

    //         //         }
    //         //     );
    //         // }
    //     // }
    // });

    const getUser = (user: any) => {
        // const auth = checkUserLoggedIn();
        return new Promise(function (resolve, reject) {
            // if (auth === undefined) {
            // } else {
            firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then((querySnapshot) => {
                    const data = querySnapshot.data();
                    // this.se
                    if (querySnapshot.data()) {
                        resolve(data);
                    } else {
                        reject('User not authenticated');
                    }
                });
            // }
        });
    };

    const signOut = () => {
        auth.doSignOut();
        setSet(false);
        // console.log
    };

    const Navbar = () => {
        return (
            <>
                <AppBar position="fixed" style={{ background: '#1b1b1b' }}>
                    <Toolbar style={{ position: 'relative' }}>
                        <Link to="/welcome">
                            <IconButton edge="end" onClick={signOut}>
                                <ExitToAppIcon style={{ color: 'white' }} />
                            </IconButton>
                        </Link>

                        <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
                        <AvatarSmall
                            User={user}
                            uid={uid}
                            User_name={user['User_name']}
                            Avatar={user['Avatar']}
                            Size="small"
                        />
                    </Toolbar>
                </AppBar>
                <Box m={2} />
                <BottomNavigation />
            </>
        );
    };
    return (
        <div className="App">
            <Router>
                {/* <Nav /> */}
                <Switch>
                    <Route exact path="/welcome">
                        <WelcomeScreen />
                    </Route>
                    <Route exact path="/sign-in">
                        <SignInScreen />
                    </Route>
                    <Route exact path="/sign-up">
                        <SignUpScreen />
                    </Route>
                    <Route exact path="/create-profile">
                        <CreateProfileScreen />
                    </Route>
                    <Route exact path="/Set-password">
                        <SetNewPasswordScreen />
                    </Route>
                    <Route exact path="/ReSet-password">
                        <ReSetNewPasswordScreen />
                    </Route>

                    <Route exact path="/home">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <HomeScreen uid={uid} />
                    </Route>
                    <Route exact path="/helpnfeedback">
                        <Navbar />
                        <Box style={{ padding: '30px' }} />
                        <HelpandFeedback />
                    </Route>
                    <Route exact path="/accessibility">
                        <Navbar />
                        <Box style={{ padding: '30px' }} />
                        <AccessibilitySettings />
                    </Route>
                    <Route exact path="/notificationset">
                        <Navbar />
                        <Box style={{ padding: '27px' }} />
                        <Notification />
                    </Route>
                    <Route exact path="/notification">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <Notificationpg />
                    </Route>
                    <Route exact path="/terms">
                        <Navbar />
                        <Box style={{ padding: '28px' }} />
                        <Terms />
                    </Route>
                    <Route exact path="/settings">
                        <Navbar />
                        <Box style={{ padding: '25px' }} />
                        <SettingsScreen />
                    </Route>
                    {/* <Navbar> */}
                    <Route path="/post/:catId">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <PostViewScreen uid={uid} user={user} />
                    </Route>
                    <Route path="/editpost/:catId">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <EditPostViewScreen />
                    </Route>
                    <Route path="/deletepost/:catId">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <DeletePostViewScreen />
                    </Route>
                    <Route path="/user/:catId">
                        <Navbar />
                        <UserPage user_uid={uid} />
                    </Route>
                    {/* </Navbar> */}
                    <Route exact path="/upload-image">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <UploadImage uid={uid} user={user} />
                    </Route>
                    <Route exact path="/search">
                        <Navbar />
                        <Box style={{ padding: '30px' }} />
                        <SearchScreen uid={uid} />
                        {/* <SearchScreen /> */}
                    </Route>

                    <Route path="/ViewPoints/:catId">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <ViewPoints uid={uid} user={user} />
                    </Route>
                    <Route path="/ViewFollowers/:catId">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <ViewFollowers />
                    </Route>
                    {/* </Navbar> */}
                    <Route exact path="/EditProfile">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <EditProfile user={user} uid={uid} />
                    </Route>
                    <Route exact path="/webcam">
                        <WebCamFun />
                    </Route>
                    <Route exact path="/explore">
                        <Navbar />
                        <Box style={{ padding: '34px' }} />
                        <ExploreScreen />
                    </Route>
                    <Route exact path="/Camera">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <Camera />
                    </Route>

                    <Route exact path="/AccountSetting">
                        <Navbar />
                        <Box style={{ padding: '20px' }} />
                        <AccountSetting />
                    </Route>
                </Switch>
            </Router>
            {/* need to populate the places in this */}
        </div>
    );
}

// function Nav() {
//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to="/welcome">Welcome</Link>
//                     </li>
//                     <li>
//                         <Link to="/sign-in">Sign-In</Link>
//                     </li>
//                     <li>
//                         <Link to="/sign-up">Sign-Up</Link>
//                     </li>
//                     <li>
//                         <Link to="/create-profile">Create Profile</Link>
//                     </li>
//                     <li>
//                         <Link to="/Set-password">Set new password</Link>
//                     </li>
//                     <li>
//                         <Link to="/ReSet-password">reset password </Link>
//                     </li>
//                     <li>
//                         <Link to="/home">Home Screen</Link>
//                     </li>
//                     <li>
//                         <Link to="/post">Post View Screen</Link>
//                     </li>
//                     <li>
//                         <Link to="/terms">Terms and Conditions</Link>
//                     </li>
//                     <li>
//                         <Link to="/settings">Settings</Link>
//                     </li>
//                     <li>
//                         <Link to="/helpnfeedback">Help and Feedback</Link>
//                     </li>
//                     <li>
//                         <Link to="/ProfilePage">Profile Page</Link>
//                     </li>
//                     <li>
//                         <Link to="/upload-image">Upload Image</Link>
//                     </li>
//                     <li>
//                         <Link to="/accessibility">Accessibility</Link>
//                     </li>
//                     <li>
//                         <Link to="/search">Search</Link>
//                     </li>
//                     <li>
//                         <Link to="/notificationset">Notifications</Link>
//                     </li>
//                     <li>
//                         <Link to="/notification">NotificationsPage</Link>
//                     </li>
//                     <li>
//                         <Link to="/ViewPoints">View points</Link>
//                     </li>
//                     <li>
//                         <Link to="/EditProfile">Edit Profile</Link>
//                     </li>
//                     <li>
//                         <Link to="/Camera">camera</Link>
//                     </li>
//                     <li>
//                         <Link to="/explore">Explore</Link>
//                     </li>
//                     <li>
//                         <Link to="/ViewFollowers">ViewFollowers</Link>
//                     </li>
//                     <li>
//                         <Link to="/AccountSetting">AccountSetting</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </div>
//     );
// }

export default App;
