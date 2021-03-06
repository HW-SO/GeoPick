import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 20,
        position: 'relative',
        backgroundColor: 'white',
        borderColor: 'white',
        fontSize: 14,
        width: '100%',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            //   borderRadius: 20,
            //   borderColor: '#80bdff',
            //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}));

export default function OccupationSelect({ control }: { control: any }) {
    const classes = useStyles();
    const [occ, setOcc] = React.useState('');
    const handleChange = (event: any) => {
        setOcc(event.target.value);
    };
    return (
        <div>
            <FormControl variant="outlined" className={classes.root}>
                <InputLabel id="occupation-select">Occupation</InputLabel>
                <Controller
                    name="Occupation"
                    control={control}
                    as={
                        <Select
                            labelId="occupation-outlines"
                            id="occupation-select"
                            value={occ}
                            onChange={handleChange}
                            label="Occupation"
                        >
                            <MenuItem value={''}> </MenuItem>
                            <MenuItem value={'Historian'}>Historian</MenuItem>
                            <MenuItem value={'Student'}>Student</MenuItem>
                            <MenuItem value={'Teacher'}>Teacher</MenuItem>
                            <MenuItem value={'Photographer'}>Photographer</MenuItem>
                            <MenuItem value={'Collector'}>Collector</MenuItem>
                            <MenuItem value={'Academcian'}>Academcian</MenuItem>
                            <MenuItem value={'Gamer'}>Gamer</MenuItem>
                        </Select>
                    }
                />
            </FormControl>
        </div>
    );
}
