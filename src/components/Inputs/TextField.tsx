import React from 'react';
import { Box, TextField as MatTextField, TextFieldProps, withStyles } from '@material-ui/core';
import clsx from 'clsx';

const styles = {
    root: {
        background: 'red',
        borderRadius: 20,
        borderColor: 'red',
    },
    notched: {
        borderColor: 'red',
    },
};

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

function TextField({ InputProps, variant = 'filled', ...props }: TextFieldProps) {
    return (
        <Box display="flex">
            <Box boxShadow={5} maxWidth={400} minWidth={320} m="auto" borderRadius={20}>
                <CssTextField
                    variant="filled"
                    fullWidth
                    InputProps={{
                        ...InputProps,
                        disableUnderline: true,
                        classes: {
                            root: clsx(styles.root),
                        },
                    }}
                    {...props}
                />
            </Box>
        </Box>
    );
}

export default TextField;
