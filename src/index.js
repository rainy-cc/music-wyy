import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import AppRouter from './routes/router';

import configureStore from './store/store';

import {Provider} from 'react-redux';

import './static/css/public.css';
import './static/css/icon.css';
import registerServiceWorker from './registerServiceWorker';


const store = configureStore();

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render( <Provider store={store}><AppRouter /></Provider> , document.getElementById('root'));
registerServiceWorker();
