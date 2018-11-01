import React, { Component } from 'react';
import LinkInput from './LinkInput';
import ImageScroller from './ImageScroller';
import api from '../API';
import '../css/User.css';

class User extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            links: []
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
        this.getUserLinks(this.props.match.params.user)
    }

    isOwnPage(userPage) {
        return this.state.authenticated && this.state.login === userPage
    }

    async getUserLinks(user) {
        const links = await api.getLinks(user)
        this.setState({ links })
    }

    render() {
        let userPage = this.props.match.params.user
        return (
            <div className="User">
                <span className="User__title">{userPage}</span>
                {this.isOwnPage(userPage) && <LinkInput user={this.state.login} onSubmit={() => this.getUserLinks(userPage)} />}
                <ImageScroller links={this.state.links} onChange={() => this.getUserLinks(userPage)} user={this.state.login} editable={this.isOwnPage(userPage)} />
            </div>
        );
    }
}

export default User;
