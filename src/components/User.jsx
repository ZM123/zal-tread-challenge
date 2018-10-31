import React, { Component } from 'react';

class User extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt")

        fetch(`/verify/${encodeURI(token)}`)
        .then(res => res.json())
        .then(res => {
            if (res.authenticated) {
                this.setState({
                    authenticated: true,
                    login: res.login
                })
            } else {
                this.setState({
                    authenticated: false
                })
            }
        })
    }

    render() {
        return (
            <div className="User">
                {this.state.authenticated && "hello " + this.state.login}
            </div>
        );
    }
}

export default User;
