import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
/*import App from './App';*/
import MyApp from './MyApp';
//import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <MyApp></MyApp>
    </HashRouter>,
    document.getElementById('root')
);

//registerServiceWorker();