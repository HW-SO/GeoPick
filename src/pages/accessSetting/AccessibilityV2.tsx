import * as React from 'react';
//import { Component } from 'react';
//import { Accessibility } from 'accessibility/src/main';
import Card from '../../components/Layouts/Card';
import { Box } from '@material-ui/core';
export interface AccessibilitySettingsProps {}

export interface AccessibilitySettingsState {}

const labels = {
    resetTitle: 'reset (in my language)',
    closeTitle: 'close (in my language)',
    menuTitle: 'title (in my language)',
    increaseText: 'increase text size (in my language)',
    decreaseText: 'decrease text size (in my language)',
    increaseTextSpacing: 'increase text spacing (in my language)',
    decreaseTextSpacing: 'decrease text spacing (in my language)',
    invertColors: 'invert colors (in my language)',
    grayHues: 'gray hues (in my language)',
    underlineLinks: 'underline links (in my language)',
    bigCursor: 'big cursor (in my language)',
    readingGuide: 'reading guide (in my language)',
    textToSpeech: 'text to speech (in my language)',
    speechToText: 'speech to text (in my language)',
};
// var options = { labels: labels };
const options = {
    increaseText: [true],
    decreaseText: [true],
    invertColors: [true],
    increaseTextSpacing: [false],
    decreaseTextSpacing: [false],
    grayHues: [true],
    underlineLinks: [true],
    bigCursor: [false],
    readingGuide: [false],
    textToSpeech: [true],
    speechToText: [false],
};
// new Accessibility({ animations: { buttons: false } }, options);

class AccessibilitySettings extends React.Component<AccessibilitySettingsProps, AccessibilitySettingsState> {
    render() {
        return (
            <Box style={{ padding: '10px' }}>
                <Card title="Accessbility Settings" split={1}>
                    {/* <Accessibility>{instance.menuInterface.increaseText()}</Accessibility> */}
                </Card>
            </Box>
        );
    }
}

export default AccessibilitySettings;
