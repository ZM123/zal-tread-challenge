import React, { Component } from 'react';
import '../css/Login.css';

class Login extends Component {
    render() {
        return (
            <div className="Login">
                <header className="App-header">
                    <a
                        className="Login__link"
                        href="https://github.com/login/oauth/authorize?client_id=8cb078e0f900fdb9a825&redirect_uri=http://localhost:8080/oauth/redirect"
                    >
                        Login with github
                    </a>
                </header>
            </div>
        );
    }
}

export default Login;
