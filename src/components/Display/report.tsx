import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';

export default function ReportButton(props: { postID: string }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const history = useHistory();

    const handleReport = () => {
        console.log('post reported!');
        // console.log(props.postID);   to check if the postID is being updated
        history.push({
            pathname: '/helpnfeedback',
            search: `?postID=${props.postID}`,
        });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            {/* <Button  >
        Open with fade transition
      </Button> */}
            <IconButton
                aria-label="settings"
                aria-controls="fade-menu"
                aria-haspopup="true"
                style={{ color: '#fafafa' }}
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem onClick={handleReport}>Report post</MenuItem>
            </Menu>
        </div>
    );
}
