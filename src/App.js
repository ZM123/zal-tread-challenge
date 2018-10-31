import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <a href="https://github.com/login/oauth/authorize?client_id=8cb078e0f900fdb9a825&redirect_uri=http://localhost:8080/oauth/redirect">
                        Login with github
                    </a>
                </header>
            </div>
        );
    }
}

export default App;
