import React from 'react';
import { Box, TextField as MatTextField, TextFieldProps, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import {
    InputAdornment
} from '@material-ui/core';
import Tick from "./Tick.svg";
import cross from "./cross.svg";


// const styles = {
//     root: {
//         background: 'red',
//         borderRadius: 20,
//         borderColor: 'red',
//     },
//     notched: {
//         borderColor: 'red',
//     },
// };

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'black',
        },
        '& label': {
            color: 'black',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
        },
        '& .MuiFilledInput-root': {
            borderRadius: 20,
            background: 'white',
            color: 'black',
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    },
})(MatTextField);

interface State {
    username: string;
    acceptableUsername: boolean;
}

export default function UsernameField({ InputProps, variant = 'filled', ...props }: TextFieldProps) {
     const [values, setValues] = React.useState<State>({
        username: '',
        acceptableUsername: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Box display="flex">
            <Box boxShadow={5} maxWidth={380} minWidth={200} width="100%" m="auto" borderRadius={20}>
                <CssTextField
                    variant="filled"
                    fullWidth
                    
                    InputProps={{
                        ...InputProps,
                        endAdornment: (
                            <InputAdornment position="end">
                            {values.acceptableUsername? <img src={Tick}/>: <img src={cross}/> }
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                    }}
                    {...props}
                    
                />
            </Box>
        </Box>
    );
}

