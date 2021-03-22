import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import Card from '../../components/Layouts/Card';
//import { RegularBtn } from '../../components/Buttons/RegularBtn';
//import TextField from '../../components/Inputs/TextField';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
//import { Box } from '@material-ui/core';
import firebase from 'firebase';
//import ProfileOverview from '../../components/Display/profileOverview';
//import Button from '@material-ui/core/Button';
//import SinglePostNew from '../../components/Display/singlePostNew';
//import Places from '../../components/Inputs/Places';

import ReactMapGL, { Marker
     //Popup 
    } from 'react-map-gl';

//import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
// import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geocoder from 'react-map-gl-geocoder';
// import Geocoder from "@mapbox/mapbox-gl-geocoder";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

export interface SearchProps {}

export default function ExploreScreen() {
    const [posts, setPosts] = useState<any[]>([]);
    const firstUpdate = useRef(true);
    const mapRef = useRef(null);
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: '100%',
        height: '100vh',
        zoom: 5,
    });

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        firebase
            .firestore()
            .collection('Posts')
            .onSnapshot((snapshot: any) => {
                setPosts(snapshot.docs.map((doc: any) => ({ id: doc.id, post: doc.data() })));
            });
        // console.log(posts);
    });

    const handleViewportChange = useCallback((newViewport) => setViewport(newViewport), []);

    // from official documentation
    const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
            const geocoderDefaultOverrides = { transitionDuration: 1000 };

            return handleViewportChange({
                ...newViewport,
                ...geocoderDefaultOverrides,
            });
        },
        [handleViewportChange],
    );
    // console.log("componentDidUpdateFunction");

    // console.log(posts)

    // useEffect(() => {

    // });
    return (
        <div className="background">
            <div className="button" style={{ float: 'left' }}>
                <ArrowBackRoundedIcon />
            </div>
            <div className="image">
                <img src={WhiteLogo} alt="GeoPicK Logo" className="WhiteLogo" />
            </div>
            <div id="titleDiv">
                <Card background="#202020" title="Explore" split={2}>
                    <ReactMapGL
                        ref={mapRef}
                        {...viewport}
                        width="100%"
                        onViewportChange={handleViewportChange}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    >
                        <Geocoder
                            mapRef={mapRef}
                            onViewportChange={handleGeocoderViewportChange}
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            position="top-left"
                        />
                        {posts.map(({ id, post }) => (
                            <Marker key={id} latitude={post.coordinates.lat} longitude={post.coordinates.lng}>
                                <Link to={{ pathname: `/post/${id}`, state: post.uid }}>
                                    <Avatar alt={post.user_name} src={post.Image} />
                                </Link>
                            </Marker>
                        ))}
                    </ReactMapGL>
                </Card>
            </div>
            <br />
        </div>
    );
}
