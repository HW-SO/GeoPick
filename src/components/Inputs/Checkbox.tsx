import { Checkbox as MatCheckbox, makeStyles, createStyles, Theme, withStyles, CheckboxProps } from '@material-ui/core';
import * as React from 'react';
import { RadioButtonUncheckedOutlined, RadioButtonCheckedRounded } from '@material-ui/icons';

// const useStyles = makeStyles((theme: Theme) =>
//     createStyles({
//         root: {
//             color: theme.palette.type === 'dark' ? 'white' : 'black',
//             '&$checked': {
//                 color: theme.palette.type === 'dark' ? 'white' : 'black',
//             },
//         },
//     }),
// );

const box = (theme: Theme) => ({
    root: {
        color: 'red',
        '&$checked': {
            color: 'red',
        },
    },
    checked: {},
});

const Custombox = withStyles(box)((props: CheckboxProps) => (
    <MatCheckbox
        icon={<RadioButtonUncheckedOutlined />}
        checkedIcon={<RadioButtonCheckedRounded />}
        color="default"
        {...props}
    />
));

const WhiteCheckbox = withStyles({
    root: {
        color: 'white',
        '&$checked': {
            color: 'white',
        },
    },
    checked: {},
})((props: CheckboxProps) => <MatCheckbox color="default" {...props} />);

function Checkbox(props: CheckboxProps) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return <WhiteCheckbox checked={checked} onChange={handleChange}/>;
}

export default Checkbox;
