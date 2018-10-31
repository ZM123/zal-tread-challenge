import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Authenticate from './components/Authenticate';
import User from './components/User';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route path='/login' exact component={Login} />
                <Route path='/authenticate' component={Authenticate} />
                <Route path='/home' component={User} />
                <Route path='/user/:user' component={User} />
            </div>
        );
    }
}

export default App;
