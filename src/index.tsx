//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import {CssBaseline} from "@material-ui/core";
import { store } from './store/store';
import './index.css';
import App from './App';

ReactDOM.render(
    <Router>
        <CssBaseline/>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
  document.getElementById('root')
);

