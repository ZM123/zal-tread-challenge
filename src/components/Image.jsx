import React, { Component } from 'react';
import api from '../API';
import '../css/Image.css';

class Image extends Component {
    constructor(props) {
        super(props);

        this.deleteImage = this.deleteImage.bind(this);
        this.alertShortLink = this.alertShortLink.bind(this);
    }

    deleteImage() {
        api.deleteLink(this.props.user, this.props.src)
        this.props.onChange()
    }

    async alertShortLink() {
        const link = await api.getShortLink(this.props.src)
        alert('Short link is ' + link.link);
    }

    render() {
        return (
            <div className="Image">
                <img className="Image__picture" src={this.props.src} alt={this.props.user} />
                {this.props.editable && <div>
                    <button onClick={this.alertShortLink}>🔗</button>
                    <button onClick={this.deleteImage}>🗑</button>
                </div>}
            </div>
        );
    }
}

export default Image;
