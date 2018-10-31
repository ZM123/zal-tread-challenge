import React, { Component } from 'react';

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
        alert('Submitting link for ' + this.props.user + ' image is ' + this.state.value);
        this.setState({value: ''})
        event.preventDefault();
    }

    render() {
        return (
            <div className="LinkInput">
                <form onSubmit={this.handleSubmit}>
                    <span>Add an image</span>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </form>
            </div>
        );
    }
}

export default LinkInput;
