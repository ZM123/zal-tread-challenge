import React, { Component } from 'react';
import Image from './Image';

class ImageScroller extends Component {
    render() {
        return (
            <div className="ImageScroller">
                {this.props.links.map(link => (
                    <div className="ImageHolder">
                        <Image src={link} onChange={this.props.onChange} user={this.props.user} editable={this.props.editable} />
                    </div>
                ))}
            </div>
        );
    }
}

export default ImageScroller;
