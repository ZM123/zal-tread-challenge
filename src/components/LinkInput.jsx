import React, { Component } from 'react';
import api from '../API.js';
import '../css/LinkInput.css';

class LinkInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Adding link ' + this.state.value);
        api.postLink(this.props.user, this.state.value);
        this.props.onSubmit()
        this.setState({value: ''})
        event.preventDefault();
    }

    render() {
        return (
            <div className="LinkInput">
                <form onSubmit={this.handleSubmit}>
                    <span className="LinkInput__label">Add an image</span>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

export default LinkInput;
