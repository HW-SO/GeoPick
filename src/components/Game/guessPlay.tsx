import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SpeedDial, { SpeedDialProps } from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import GuessTheLocationButton from '../Display/guess-the-location.svg';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transform: 'translateZ(0px)',
            flexGrow: 1,
            backgroundColor: 'transparent',
        },
        speedDial: {
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            '&.MuiFab-primary': {
                backgroundColor: 'transparent',
            },
        },
        options: {
            width: '80px',
            height: '40px',
            textSizeAdjust: 'auto',
            fontSize: '0.7em',
        },
    }),
);

export default function GuessTheLocationPlay({ city1, city2, city3 }: { city1: string; city2: string; city3: string }) {
    const classes = useStyles();
    const [direction] = React.useState<SpeedDialProps['direction']>('up');
    const [open, setOpen] = React.useState(false);

    // const [hidden] = React.useState(false);

    const actions = [
        { icon: <p>{city1}</p>, name: '' },
        { icon: <p>{city2}</p>, name: '' },
        { icon: <p>{city3}</p>, name: '' },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        //   <div className={classes.exampleWrapper}>
        // transform: 'translate(10em, -10em)',
        <SpeedDial
            style={{ height: 'auto' }}
            ariaLabel="SpeedDial example"
            // className={classes.speedDial}
            hidden={true}
            icon={
                // <IconButton style={{ position: 'sticky', width: '50px' }}>

                <img
                    src={GuessTheLocationButton}
                    alt="Guess The Location"
                    style={{ backfaceVisibility: 'hidden' }}
                ></img>
                // </IconButton>
            }
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction={direction}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    className={classes.options}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={handleClose}
                />
            ))}
        </SpeedDial>
    );
}
