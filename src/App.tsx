import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import WelcomeScreen from './pages/welcome screen';
import SignInScreen from './pages/sign-in screen/SignInForm';
import SignUpScreen from './pages/sign-up screen/SignupForm';
import CreateProfileScreen from './pages/create-profile-screen';
import SetNewPasswordScreen from './pages/sign-in screen/setnewpass';
import ReSetNewPasswordScreen from './pages/sign-in screen/resetpass';
import { Terms } from './pages/terms/index';
import { HomeScreen } from './pages/home-screen/home';
import PostViewScreen from './pages/post-view';
import EditPostViewScreen from './pages/edit-post';
import DeletePostViewScreen from './pages/delete-post';
import HelpandFeedback from './pages/helpandfeedback';
import SettingsScreen from './pages/settings-screen/SettingsMenu';
import UserPage from './pages/profile-screen/userPage';
import SearchScreen from './pages/search-page/index';
import ExploreScreen from './pages/explore-page/index';

import { UploadImage } from './pages/upload-image/index';
import AccessibilitySettings from './pages/accessSetting/index';
import Notification from './pages/notificationset';
import Notificationpg from './pages/notification';
import Places from './components/Inputs/Places';
import ViewPoints from './pages/view-points-screen/points';
import EditProfile from './pages/edit-profile/editProfile';
import LocationPicker from './components/Inputs/LocationPicker';
import Camera from './components/Inputs/Camera';
import ViewFollowers from './pages/followers-page/ViewFollowers';
import WebCamFun from './pages/camera/index';
import AccountSetting from './pages/AccountSetting/index';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
// import GTLexpanded from './components/Display/GTLexpanded';
function App(): JSX.Element {
    return (
        <div className="App">
            <Router>
                <Nav />
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
                        <HomeScreen />
                    </Route>
                    <Route exact path="/helpnfeedback">
                        <HelpandFeedback />
                    </Route>
                    <Route exact path="/accessibility">
                        <AccessibilitySettings />
                    </Route>
                    <Route exact path="/notificationset">
                        <Notification />
                    </Route>
                    <Route exact path="/notification">
                        <Notificationpg />
                    </Route>
                    <Route exact path="/terms">
                        <Terms />
                    </Route>
                    <Route exact path="/settings">
                        <SettingsScreen />
                    </Route>
                    <Route path="/post/:catId" component={PostViewScreen}></Route>
                    <Route path="/editpost/:catId" component={EditPostViewScreen}></Route>
                    <Route path="/deletepost/:catId" component={DeletePostViewScreen}></Route>
                    <Route path="/user/:catId" component={UserPage}></Route>
                    <Route exact path="/upload-image">
                        <UploadImage />
                    </Route>
                    <Route exact path="/search">
                        <SearchScreen />
                    </Route>
                    <Route exact path="/ViewPoints">
                        <ViewPoints />
                    </Route>
                    <Route exact path="/EditProfile">
                        <EditProfile />
                    </Route>
                    <Route exact path="/webcam">
                        <WebCamFun />
                    </Route>
                    <Route exact path="/explore">
                        <ExploreScreen />
                    </Route>
                    <Route exact path="/Camera">
                        <Camera />
                    </Route>
                    <Route exact path="/ViewFollowers">
                        <ViewFollowers />
                    </Route>
                    <Route exact path="/AccountSetting">
                        <AccountSetting />
                    </Route>
                </Switch>
            </Router>
            {/* need to populate the places in this */}
        </div>
    );
}

function Nav() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/welcome">Welcome</Link>
                    </li>
                    <li>
                        <Link to="/sign-in">Sign-In</Link>
                    </li>
                    <li>
                        <Link to="/sign-up">Sign-Up</Link>
                    </li>
                    <li>
                        <Link to="/create-profile">Create Profile</Link>
                    </li>
                    <li>
                        <Link to="/Set-password">Set new password</Link>
                    </li>
                    <li>
                        <Link to="/ReSet-password">reset password </Link>
                    </li>
                    <li>
                        <Link to="/home">Home Screen</Link>
                    </li>
                    <li>
                        <Link to="/post">Post View Screen</Link>
                    </li>
                    <li>
                        <Link to="/terms">Terms and Conditions</Link>
                    </li>
                    <li>
                        <Link to="/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="/helpnfeedback">Help and Feedback</Link>
                    </li>
                    <li>
                        <Link to="/ProfilePage">Profile Page</Link>
                    </li>
                    <li>
                        <Link to="/upload-image">Upload Image</Link>
                    </li>
                    <li>
                        <Link to="/accessibility">Accessibility</Link>
                    </li>
                    <li>
                        <Link to="/search">Search</Link>
                    </li>
                    <li>
                        <Link to="/notificationset">Notifications</Link>
                    </li>
                    <li>
                        <Link to="/notification">NotificationsPage</Link>
                    </li>
                    <li>
                        <Link to="/ViewPoints">View points</Link>
                    </li>
                    <li>
                        <Link to="/EditProfile">Edit Profile</Link>
                    </li>
                    <li>
                        <Link to="/Camera">camera</Link>
                    </li>
                    <li>
                        <Link to="/explore">Explore</Link>
                    </li>
                    <li>
                        <Link to="/ViewFollowers">ViewFollowers</Link>
                    </li>
                    <li>
                        <Link to="/AccountSetting">AccountSetting</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default App;
