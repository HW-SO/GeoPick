import * as React from 'react';
import './styles.scss';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import { Grid, Typography, Box } from '@material-ui/core';
import Card from '../../components/Layouts/Card';
import { Avatar, IconButton, Toolbar } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
export interface AccessibilityProps {}

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

export default function Accessibility() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div style={{ background: '#1b1b1b' }} className="bgg">
            <Toolbar>
                <img src={WhiteLogo} alt="GeoPicK" className="WhiteLogo" />
            </Toolbar>
            <div style={{ color: '#fafafa' }}>
                <Card background="#202020" title="Accessibility Settings" split={1}>
                    <div style={{ color: 'black' }}>
                        <FormGroup>
                            <WhiteTypography>
                                Dark Mode
                                <Box m={-3.7}></Box>
                                <FormControlLabel
                                    control={
                                        <OrangeSwitch
                                            checked={state.checkedA}
                                            onChange={handleChange}
                                            name="checkedA"
                                        />
                                    }
                                    label=""
                                    style={{ float: 'right' }}
                                />
                            </WhiteTypography>
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <WhiteTypography>
                                Change to mono colors
                                <Box m={-3.7}></Box>
                                <FormControlLabel
                                    control={
                                        <OrangeSwitch
                                            checked={state.checkedB}
                                            onChange={handleChange}
                                            name="checkedB"
                                        />
                                    }
                                    label=""
                                    style={{ float: 'right' }}
                                />
                            </WhiteTypography>
                        </FormGroup>
                        <br></br>
                        <FormGroup>
                            <WhiteTypography>
                                Increase overall text size
                                <Box m={-3.7}></Box>
                                <FormControlLabel
                                    control={
                                        <OrangeSwitch
                                            checked={state.checkedC}
                                            onChange={handleChange}
                                            name="checkedC"
                                        />
                                    }
                                    label=""
                                    style={{ float: 'right' }}
                                />
                            </WhiteTypography>
                        </FormGroup>
                    </div>
                </Card>
            </div>
            <br />
        </div>
    );
}
