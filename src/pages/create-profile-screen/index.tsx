import * as React from 'react';
import './styles.scss';
import TextField from '../../components/Inputs/TextField';
import Card from '../../components/Layouts/Card';
import { Grid, Typography } from '@material-ui/core';
import BadgeAvatar from '../../components/Display/AddAvatarBadge';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import sampleavatar from './sample-avatar.png';
import { storage } from '../../firebase/firebase';
import firebase from 'firebase';
import Compress from 'react-image-file-resizer';
import OccupationSelect from '../../components/Inputs/occupation';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase';
export interface CreateProfileProps {}

export default class CreateProfileScreen extends React.Component<CreateProfileProps> {
    state: { img: {}; height: number | null; width: number | null; imgurl: string; usernameExists: boolean } = {
        img: {},
        height: 0,
        width: 0,
        imgurl: sampleavatar,
        usernameExists: false,
    };

    changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files[0]) return;
        const file = await event.target.files[0];
        this.setState({ img: file });
        console.log(this.state.img);
        const user = auth.checkUserLoggedIn();

        if (!user) return;
        const image = new Image();
        let fr = new FileReader();

        fr.onload = async function () {
            if (fr !== null && typeof fr.result == 'string') {
                image.src = fr.result;
                console.log('in frload');
                console.log('frwidg', image.width);
                console.log('frhigg', image.height);
            }
        };
        fr.readAsDataURL(file);

        var width = 0;
        var height = 0;

        image.onload = function () {
            height = image.height;
            width = image.width;
        };

        setTimeout(() => {
            Compress.imageFileResizer(
                file,
                width,
                height,
                'JPEG',
                50,
                0,
                async (uri) => {
                    if (typeof uri === 'string') {
                        const urinew = uri.split('base64,')[1];
                        storage
                            .ref(`/Images/${user.uid}/Avatar/${file.name}`)
                            .putString(urinew, 'base64')
                            .then((data) => {
                                data.ref.getDownloadURL().then((url) => {
                                    this.setState({ imgurl: url });
                                    firebase.firestore().collection('users/').doc(`${user.uid}/`).update({
                                        Avatar: url,
                                    });
                                });
                            });
                    }
                },
                'base64',
            );
        }, 2500);
    };

    public render(): JSX.Element {
        return (
            <html>
                <body>
                    <div className="Create-Profile-Page">
                        <Card title="Create Profile" split={1}>
                            <Grid container spacing={4} direction="row" alignItems="center" justify="center">
                                <Grid item>
                                    <BadgeAvatar src={this.state.imgurl} onChange={this.changeAvatar} />
                                </Grid>
                                <CreateProfileForm img={this.state.imgurl} />
                            </Grid>
                        </Card>
                    </div>
                </body>
            </html>
        );
    }
}

const CreateProfileFields = ({ register, errors, control }: { register: any; errors: any; control: any }) => {
    let usernameExists = false;
    const handleChange = (event: any) => {
        console.log(event.target.value);
        console.log(usernameExists);
        ////////// CHECKING THE USERNAME AND ALL HERE /////////////////////////////////////////////////////////////////
        firebase
            .firestore()
            .collection('users/')
            .where('User_name', '==', event.target.value)
            .get()
            .then(function (snapShot) {
                snapShot.forEach(function (doc) {
                    if (doc.exists) {
                        usernameExists = true;
                    } else {
                        usernameExists = false;
                    }
                });
            });
    };

    return (
        <Grid item container spacing={3} direction="row" alignItems="center" justify="center">
            <Grid item style={{ width: '100%' }}>
                <TextField
                    name="username"
                    id="username"
                    label="Username"
                    type="username"
                    inputRef={register({
                        required: true,
                        pattern: {
                            value: /^[A-Z0-9_]{3,8}$/i,
                            message: 'invalid username',
                        },
                        validate: () => usernameExists === false,
                    })}
                    error={errors.username || usernameExists ? true : false}
                    helperText={
                        errors.username || usernameExists
                            ? 'invalid user name: either exists or uses illegal character'
                            : null
                    }
                    onChange={handleChange}
                />
            </Grid>
            <Grid item style={{ width: '100%' }}>
                <OccupationSelect control={control} />
            </Grid>
        </Grid>
    );
};

const CreateProfileForm = ({ img }: { img: string }) => {
    const { handleSubmit, errors, register, control } = useForm();
    const { push } = useHistory();
    const onSubmit = (data: any) => {
        const user = auth.checkUserLoggedIn();
        if (user !== undefined) {
            if (errors !== {}) {
                firebase
                    .firestore()
                    .collection('users/')
                    .doc(user.uid)
                    .set({
                        Avatar: img,
                        Bio: '',
                        GamePoint: 0,
                        Occupation: data.Occupation,
                        User_name: data.username,
                    })
                    .catch((err) => {
                        console.log('Error ' + err);
                        alert(err);
                    });
                push('/home');
            }
        }
    };

    const history = useHistory();
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CreateProfileFields register={register} errors={errors} control={control} />
                <Grid item container spacing={3}>
                    <Grid
                        item
                        xs={10}
                        alignContent="center"
                        alignItems="center"
                        style={{ paddingTop: '20px', verticalAlign: 'true' }}
                    >
                        <Typography align="left" style={{ fontSize: '12px', color: '1B1B1E' }}>
                            *Other users will be able to view your username and display picture as set above
                        </Typography>
                        <br></br>
                    </Grid>
                </Grid>
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn type="submit" colorType="white" style={{ width: '80%', borderRadius: '15px' }}>
                        Complete Registration
                    </RegularBtn>
                </Grid>
                <br />
                <br />
                <Grid item xs={12} alignItems="center" justify="center" style={{ textAlign: 'center' }}>
                    <RegularBtn
                        colorType="white"
                        style={{ width: '100%', borderRadius: '15px' }}
                        onClick={(e) => {
                            history.push('/sign-up');
                        }}
                    >
                        Go Back
                    </RegularBtn>
                </Grid>
            </form>
        </>
    );
};
