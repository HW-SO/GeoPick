import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import TextField from '../../components/Inputs/TextField';
import PasswordField from '../../components/Inputs/PasswordField';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useState } from 'react';
export interface SignInProps {}

export default function SignInScreens() {
    return (
        <div className="bg">
            <Card background="white" title="Sign in" split={1}>
                <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                    <SignInHeader title="You know what to do..." />
                    <SignInForm />
                </Grid>
            </Card>
            <br />
        </div>
    );
}

const SignInHeader = (props: { title: string }) => {
    return (
        <Grid item>
            <Typography variant="h4" style={{ color: '#f56920', fontWeight: 'unset', textAlign: 'left' }}>
                {props.title}
            </Typography>
            <br />
        </Grid>
    );
};

const SignInFields = ({ register, errors }: { register: any; errors: any }) => {
    console.log(errors);
    return (
        <Grid item container spacing={3} direction="row" alignItems="center" justify="center">
            <Grid item style={{ width: '100%' }}>
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
                    helperText={errors.email ? 'invalid email' : null}
                />
            </Grid>
            <Grid item style={{ width: '100%' }}>
                <PasswordField
                    name="password"
                    id="Password"
                    inputRef={register({ required: true, minLength: 8 })}
                    error={errors.password ? true : false}
                    helperText={errors.password ? 'invalid password' : null}
                />
                <br />
            </Grid>
        </Grid>
    );
};

const SignInForm = () => {
    const { handleSubmit, errors, register } = useForm();
    const [verified, setVerified] = useState<boolean>(true);
    const history = useHistory();
    const onSubmit = (data: any) => {
        auth.doSignInWithEmailAndPassword(data.email, data.password)
            .then((currentUser) => {
                alert('sucessfully signed in ');

                if (currentUser && !currentUser.user?.emailVerified) {
                    alert('email not verified');
                    setVerified(false);
                } else history.push('/home');
            })
            .catch((err) => {
                console.log('Error ' + err);
                alert(err);
            });
    };

    const bitch = () => {
        if (verified && auth.currentUser) return <Redirect to={'/home'} />;
        if (!verified && auth.currentUser) {
            alert(`Please verify your current email: ${auth.currentUser.email}`);
            return <Redirect to={'/welcome'} />;
        } else return null;
    };

    return (
        <>
            {bitch()}
            <form onSubmit={handleSubmit(onSubmit)}>
                <SignInFields register={register} errors={errors} />
                <Grid container spacing={3}>
                    <Grid
                        item
                        xs={10}
                        alignContent="center"
                        alignItems="center"
                        style={{ paddingTop: '20px', verticalAlign: 'true' }}
                    ></Grid>
                </Grid>
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn type="submit" colorType="orange" style={{ width: '50%', borderRadius: '15px' }}>
                        Sign In
                    </RegularBtn>
                </Grid>
                <br />
                <Link to="/ReSet-password"> Forgot Password ?</Link>
                <br />
                <br />
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn
                        colorType="orange"
                        style={{ width: '50%', borderRadius: '15px' }}
                        onClick={(e) => {
                            history.push('/welcome');
                        }}
                    >
                        Go Back
                    </RegularBtn>
                </Grid>
            </form>
        </>
    );
};
