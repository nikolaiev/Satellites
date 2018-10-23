import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import {App} from './App'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

function reducer(state = [], action) {
    console.log(state )
    console.log(action)

    if (action.type === 'ADD_POST') {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);

// import React from 'react'
// import ReactDOM from 'react-dom'
// import {App} from './App'
//
// ReactDOM.render(<App/>, document.getElementById('root'));