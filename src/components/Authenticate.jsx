import React, { Component } from 'react';

class Authenticate extends Component {
    componentDidMount() {
        const query = window.location.search.substring(1)
        const token = query.split('request_token=')[1]

        fetch(`/userdetails/${token}`)
        .then(res => res.json())
        .then(res => {
            if (res.jwt) localStorage.setItem("jwt", res.jwt)
            this.props.history.push('/home')
        })
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
