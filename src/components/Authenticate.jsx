import React, { Component } from 'react';

class Authenticate extends Component {
    componentDidMount() {
        const query = window.location.search.substring(1)
        const token = query.split('request_token=')[1]

        if (token) {
            fetch(`/userdetails/${token}`)
            .then(res => res.json())
            .then(res => {
                if (res.jwt) {
                    localStorage.setItem("jwt", res.jwt)
                    this.props.history.push(`/user/${res.login}`)
                } else {
                    this.props.history.push('/login')
                }
            })
        } else {
            this.props.history.push('/login')
        }
    }

    render() {
        return (
            <div className="Authenticate">
                <header className="App-header">
                    Authenticating...
                </header>
            </div>
        );
    }
}

export default Authenticate;
