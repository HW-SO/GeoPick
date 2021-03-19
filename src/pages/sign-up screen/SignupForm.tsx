import { Grid, Typography } from '@material-ui/core';
import * as React from 'react';
import TextField from '../../components/Inputs/TextField';
import PasswordField from '../../components/Inputs/PasswordField';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import { auth } from '../../firebase';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import Recaptcha from 'react-recaptcha';
import { useState } from 'react';

export interface SignUpProps {}

export default function SignUpScreen() {
    return (
        <Card title="Sign Up!" split={1}>
            <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                <SignUpHeader title="Enter some of your personal details" />
                <SignUpForm />
            </Grid>
        </Card>
    );
}

const SignUpHeader = (props: { title: string }) => {
    return (
        <Grid item>
            <Typography variant="h5" style={{ color: 'white', fontWeight: 'unset', textAlign: 'left' }}>
                {props.title}
            </Typography>
        </Grid>
    );
};

const SignUpFields = ({ register, errors }: { register: any; errors: any }) => {
    console.log(errors);
    // const [checked, setChecked] = React.useState(false);

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
                    inputRef={register({ required: true, minLength: 6 })}
                    error={errors.password ? true : false}
                    helperText={errors.password ? 'invalid password' : null}
                />
            </Grid>
            <Grid item style={{ width: '100%' }}>
                <PasswordField
                    name="confirmpassword"
                    id="ConformPassword"
                    label="Confirm Password"
                    inputRef={register({ required: true, minLength: 6 })}
                    error={errors.password ? true : false}
                    helperText={errors.password ? 'invalid password' : null}
                />
            </Grid>
        </Grid>
    );
};

const SignUpForm = () => {
    const { handleSubmit, errors, register } = useForm();
    const [verified, setVerified] = useState(false);
    const { push } = useHistory();
    const onSubmit = (data: any) => {
        console.log('trying ');
        if (data.password === data.confirmpassword) {
            auth.doCreateUserWithEmailAndPassword(data.email, data.password)
                .then(() => {
                    auth.doEmailVerification(data.email);
                })
                .catch((err) => {
                    console.log('Error ' + err);
                    alert(err);
                });
        } else {
            alert('type the same password in confirmation password');
        }

        if (verified === true) {
            push('/create-profile');
        }
    };

    function onChange(value: any) {
        if (value) setVerified(false);
        console.log('Captcha value:', value);
    }

    function handleChange() {
        if (verified) {
            alert('Verified');
        } else {
            alert('Please Verify to Carry On');
        }
    }

    function loaded() {
        console.log('Captcha Loaded');
    }

    function verifyCallback(response: any) {
        console.log(response);
        if (response) {
            setVerified(true);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <SignUpFields register={register} errors={errors} />
                <Grid item container spacing={3}>
                    <br />
                    <br />
                    <div style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '20px', marginBottom: '10px' }}>
                        <Recaptcha
                            sitekey="6Lco434aAAAAAMfd6uv2gnxsxpcVdA-mI7BlA2Pr"
                            onChange={onChange}
                            render="explicit"
                            onloadCallback={loaded}
                            verifyCallback={verifyCallback}
                        />
                    </div>
                    <label style={{ color: 'white' }}>
                        <input type="checkbox" name="Accept" required />
                        By signing up I confirm that I have read and accepted the{' '}
                        <a href="/terms">terms and conditions</a> of using the application.
                    </label>
                    <br />
                </Grid>
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn
                        type="submit"
                        colorType="white"
                        style={{ width: '50%', borderRadius: '15px' }}
                        onClick={handleChange}
                    >
                        Sign Up!
                    </RegularBtn>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <Link to="/welcome">
                        <RegularBtn colorType="white" style={{ width: '100%', borderRadius: '15px' }}>
                            Go Back
                        </RegularBtn>
                    </Link>
                </Grid>
            </form>
        </>
    );
};
