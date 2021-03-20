import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(24),
        height: theme.spacing(24),
    },
}));

export default function AvatarSmall(props: any) {    
    const classes = useStyles();
    if (props.uid !== undefined)
    return (
                <Link to={{ pathname: `/user/${props.uid}`, state: props.uid }}>
                <IconButton edge="end">
                    {props.Size === "small" &&
                        <Avatar alt={props.User_name} src={props.Avatar}/>
                    }
                    {props.Size === "large" &&
                        <Avatar alt={props.User_name} src={props.Avatar} className={classes.large}/>
                    }
                </IconButton>
                </Link>
    );
    else return (
        <IconButton edge="end">
                    {props.Size === "small" &&
                        <Avatar alt={props.User_name} src={props.Avatar}/>
                    }
                    {props.Size === "large" &&
                        <Avatar alt={props.User_name} src={props.Avatar} className={classes.large}/>
                    }
        </IconButton>
    );
}
