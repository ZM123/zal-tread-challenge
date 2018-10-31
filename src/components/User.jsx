import React, { Component } from 'react';
import LinkInput from './LinkInput';
import ImageScroller from './ImageScroller';

class User extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("jwt")

        if (token) {
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
    }

    isOwnPage(userPage) {
        return this.state.authenticated && this.state.login === userPage
    }

    render() {
        let userPage = this.props.match.params.user
        return (
            <div className="User">
                <span className="user__title">{userPage}</span>
                {this.isOwnPage(userPage) && <LinkInput user={this.state.login} />}
                <ImageScroller />
            </div>
        );
    }
}

export default User;
