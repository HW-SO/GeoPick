import * as React from 'react';
import WhiteLogo from '../welcome screen/WhiteLogo.svg';
import './styles.scss';
import Card from '../../components/Layouts/Card';
import { RegularBtn } from '../../components/Buttons/RegularBtn';
import TextField from '../../components/Inputs/TextField';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ReportButton from '../../components/Display/report';
import { useLocation } from 'react-router-dom';
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

    function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const postID = query.get('postID');
        console.log(e.target[0]);
        let myTemplate = {
            username: e.target[0].value,
            feedbacks: e.target[1].value,
            postID: postID,
        };
        emailjs.send('service_7um7ypw', 'template_my7a0ii', myTemplate, 'user_pKzNS4ftM2sSAMAFNjGVw').then(
            (result) => {
                console.log(result.text);
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
            <div className="image">
                <img src={WhiteLogo} alt="GeoPicK Logo" className="WhiteLogo" />
            </div>
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
                            label="Username"
                            variant="outlined"
                            placeholder="Enter Username"
                            name="username"
                        />
                        <br></br>

                        <TextField
                            id="standard-multiline-flexible"
                            label="Feedback"
                            variant="outlined"
                            placeholder="Write something..."
                            name="feedbacks"
                            multiline
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
