import axios from 'axios';
import { FETCH_USER } from "./types";


export const fetchUser = () => async dispatch => {

    // Redux thunk watches all the actions, if it sees a function instead of a normal object,
    // it will call the function with the dispatcher as an argument.
    const request = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: request.data });
};


/** Code above is equivalent to the code below. **/
// export const fetchUser = () => {
//
//     // Redux thunk watches all the actions, if it sees a function instead of a normal object,
//     // it will call the function with the dispatcher as an argument.
//     return function (dispatch) {
//         axios.get('/api/current_user')
//             .then(res => dispatch({ type: FETCH_USER, payload:res }))
//             .catch(error => console.log('ERROR!!!', error));
//     };
// };

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    console.log(res);
    dispatch({ type: FETCH_USER, payload: res.data});
};