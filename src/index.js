import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Photos from './pages/Photos';
import Home from './pages/Home'
import WebProjects from './pages/WebProjects'
import * as serviceWorker from './serviceWorker'

const routing = (
    <Router>
        <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/WebProjects' component={WebProjects} />
            <Route path='/Photos/:initialSearch' component={Photos} />
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
