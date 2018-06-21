import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// Components
import App from './components/App';
import reducers from './reducers';

// CSS
import 'materialize-css/dist/css/materialize.min.css';

import axios from 'axios';
window.axios = axios;


// const survey = {
//     title: 'my title',
//     subject: 'my subject',
//     recipients: 'caquillo722@gmail.com',
//     body: 'here is the body of the email'
// };

// TODO: - delete this.
// setTimeout(function () {
//     console.log('making email request');
//     axios.post('/api/surveys', survey)
//         .then(function (res) {
//             console.log(res);
//         }).catch(function (err) {
//         console.log(err);
//     });
// }, 1000);


// Redux
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

console.log(process.env);
