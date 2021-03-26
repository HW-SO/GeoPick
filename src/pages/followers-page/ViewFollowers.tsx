import * as React from 'react';
import { Component } from 'react';
import Card from '../../components/Layouts/Card';
import { Box } from '@material-ui/core';
import CustomTab from './CustomTab';
import WhiteLogo from '../../pages/welcome screen/WhiteLogo.svg';
export interface ViewFollowersProps {}

export interface ViewFollowersState {}

class ViewFollowers extends React.Component<ViewFollowersProps, ViewFollowersState> {
    render() {
        return (
            <Box style={{ background: '#1b1b1b' }}>
                {/* <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" /> */}
                <div style={{ padding: '25px' }} />
                <span style={{ color: '#fafafa' }}>
                    <Card background="#202020" title="Fellow GeoPicKers" split={1}>
                        <CustomTab />
                    </Card>
                </span>
            </Box>
        );
    }
}

export default ViewFollowers;
