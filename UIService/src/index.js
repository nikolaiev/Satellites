import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import {AppStateful} from './App'
import {Helmet} from "react-helmet";

import Create from './components/Create'
import Info from './components/Info'
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import {HashRouter, Route} from "react-router-dom";

function reducer(state = [], action) {
     if (action.type === 'GET_SATELLITES') {
        return [
            ...action.payload
        ];
    }
    return state;
}

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
        <div style={{height: "100%"}}>
            <Helmet>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossorigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
                      integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
                      crossorigin="anonymous"/>
            </Helmet>
            <HashRouter>
                <div style={{height: "100%"}}>
                    <Route path='/' component={AppStateful}/>
                    <Route path='/create' component={Create}/>
                    <Route path='/info/:satlName' render={props => <Info {...props} />}/>
                </div>
            </HashRouter>
        </div>
    </Provider>, document.getElementById('root')
);
