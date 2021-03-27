import { Component } from 'react';
import './homesStyles.scss';
import HomeFeed from '../../components/Layouts/homefeed';
import { Box } from '@material-ui/core';

export interface HomeScreenProps {
    uid: string;
}
export class HomeScreen extends Component<HomeScreenProps> {
    render() {
        return (
            <div style={{ background: '#1b1b1b' }}>
                {!this.props.uid && <p style={{ color: 'white' }}>Please log in first!</p>}
                {this.props.uid && <HomeFeed uid={this.props.uid} />}
                <Box m={2} />
            </div>
        );
    }
}
