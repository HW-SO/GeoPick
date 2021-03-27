import * as React from 'react';
import { Typography, Box } from '@material-ui/core';
import Card from '../../components/Layouts/Card';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
export interface NotificationProps {}

const OrangeSwitch = withStyles({
    switchBase: {
        color: '#fafafa',
        '&$checked': {
            color: '#F56920',
        },
        '&$checked + $track': {
            backgroundColor: '#f56920',
        },
    },
    checked: {},
    track: {},
})(Switch);

const WhiteTypography = withStyles({
    root: {
        color: '#FAFAFA',
        textAlign: 'left',
    },
})(Typography);

export default function Notification() {
    const [state, setState] = React.useState({
        checkedA: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div style={{ background: '#1b1b1b' }} className="bgg">
            {/* <Toolbar>
                <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
            </Toolbar> */}

            <div style={{ color: '#fafafa' }}>
                <Card background="#202020" title="Notification Settings" split={1}>
                    <div style={{ color: 'black' }}>
                        {/* <Grid container spacing={4} direction="row" alignItems="center" justify="center"> */}
                        <WhiteTypography>
                            Push notification
                            <Box m={-3.7}></Box>
                            <FormGroup style={{ float: 'right' }}>
                                <FormControlLabel
                                    control={
                                        <OrangeSwitch
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            name="checkedA"
                                        />
                                    }
                                    label=""
                                />
                            </FormGroup>
                        </WhiteTypography>
                        {/* </Grid> */}
                    </div>
                </Card>
            </div>
            <br />
        </div>
    );
}
