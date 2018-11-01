import React, { Component } from 'react';
import Image from './Image';

class ImageScroller extends Component {
    render() {
        // Ideally, this scroller would make paginated requests for more images
        // However, I felt that was out of scope for a challenge of this size
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
