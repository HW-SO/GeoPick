import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import TextField from '../../components/Inputs/TextField';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
export interface ResetProps {}

export default function ResetScreens() {
    return (
        <div className="bg">
            <Card background="white" title="Reset password" split={1}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                    <ResetHeader title="We just want to confirm your identity..." />
                    <ResetForm />
                </Grid>
            </Card>
            <br />
        </div>
    );
}

const ResetHeader = (props: { title: string }) => {
    return (
        <Grid item>
            <Typography variant="h4" style={{ color: '#f56920', fontWeight: 'unset', textAlign: 'left' }}>
                {props.title}
            </Typography>
        </Grid>
    );
};

const ResetFields = ({ register, errors }: { register: any; errors: any }) => {
    console.log(errors);
    return (
        <Grid item container spacing={4} direction="row" alignItems="center" justify="center">
            <Grid item style={{ width: '150%' }}>
                <TextField
                    name="email"
                    id="Email"
                    label="Email"
                    type="email"
                    inputRef={register({
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'invalid email address',
                        },
                    })}
                    error={errors.email ? true : false}
                    helperText={errors.email ? 'invalid Email ID' : null}
                />
            </Grid>
        </Grid>
    );
};

const ResetForm = () => {
    const { handleSubmit, errors, register } = useForm();
    const onSubmit = (data: any) => {
        console.log('trying ');
        auth.doPasswordReset(data.email)
            .then(() => {
                console.log('reset password link send to your mail');
                alert('reset password link sent to your mail');
            })
            .catch((err) => {
                console.log('Error ' + err);
                alert(err);
            });
    };

    const history = useHistory();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ResetFields register={register} errors={errors} />
                <Grid item container spacing={3}>
                    <Grid
                        item
                        xs={10}
                        alignContent="center"
                        alignItems="center"
                        style={{ paddingTop: '20px', verticalAlign: 'true' }}
                    ></Grid>
                </Grid>
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn type="submit" colorType="orange" style={{ width: '100%', borderRadius: '15px' }}>
                        Send me a Link
                    </RegularBtn>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn
                        colorType="orange"
                        style={{ width: '100%', borderRadius: '15px' }}
                        onClick={(e) => {
                            history.push('/sign-in');
                        }}
                    >
                        Go Back
                    </RegularBtn>
                </Grid>
                <br />
            </form>
        </>
    );
};
