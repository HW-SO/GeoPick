import * as React from 'react';
import './styles.scss';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import TextField from '../../components/Inputs/TextField';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import { useLocation } from 'react-router-dom';
import { auth } from '../../firebase/firebase';
export interface HelpandFeedbackProps {
    postID?: string;
}

const WhiteTypography = withStyles({
    root: {
        color: '#FAFAFA',
        textAlign: 'left',
    },
})(Typography);

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function HelpandFeedback(props: HelpandFeedbackProps) {
    const history = useHistory();
    const query = useQuery();
    const [feedback, setFeedback] = React.useState<string>('');

    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const postID = query.get('postID');

        let myTemplate = {
            username: auth.currentUser?.uid,
            feedbacks: feedback,
            postID: postID,
        };

        emailjs.send('service_7um7ypw', 'template_my7a0ii', myTemplate, 'user_pKzNS4ftM2sSAMAFNjGVw').then(
            (result) => {
                alert('Thank You For Your Feedback ✅ ');
                history.push('/home');
            },
            (error) => {
                console.log(error.text);
            },
        );
        // e.target.reset();
    }

    return (
        <div className="background">
            {/* <div className="image">
                <img src={WhiteLogo} alt="GeoPicK Logo" className="WhiteLogo" />
            </div> */}
            <div id="titleDiv">
                <Card background="#202020" title="Help & FeedBack" split={2}>
                    <WhiteTypography>Hi there👋,</WhiteTypography>
                    <br></br>
                    <WhiteTypography>
                        This is our first phone based web application. We would love to hear your Feedback.
                    </WhiteTypography>
                    <br></br>
                    <WhiteTypography>
                        {' '}
                        You can either <a href="mailto:geopick2021@gmail.com">mail</a> the developer team or send any
                        message via the feedback form.
                    </WhiteTypography>
                    <br></br>
                    <WhiteTypography>Your Feedback Matters ☺️ </WhiteTypography>
                    <br></br>
                    <WhiteTypography>Thanks❤,</WhiteTypography>
                    <br></br>
                    <WhiteTypography>
                        The Geo<span style={{ color: '#f56920' }}>Pic</span>K Dev Team
                    </WhiteTypography>
                    <br></br>
                    <form onSubmit={sendEmail}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Feedback"
                            variant="outlined"
                            placeholder="Write something..."
                            name="feedbacks"
                            multiline
                            onChange={(e) => setFeedback(e.target.value)}
                            rowsMax={5}
                        />

                        <br></br>
                        <RegularBtn type="submit" colorType="orange" style={{ width: 'auto', borderRadius: '20px' }}>
                            Send Feedback
                            <ArrowForwardIosOutlinedIcon />
                        </RegularBtn>
                    </form>
                    <br></br>
                </Card>
            </div>
            <br />
        </div>
    );
}
