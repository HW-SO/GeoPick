import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

ReactDOM.render(
    <React.StrictMode>
        <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=Poppins:ital,wght@0,200;0,500;0,600;1,400;1,600&family=Quicksand:wght@400;500;600&display=swap');
        </style>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
