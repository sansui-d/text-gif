import React from 'react';
import './index.less';

function Card(props) {
    const { content, count, onClick } = props

    return (
        <div className="text-gif-card" onClick={onClick} >
            <div className="text-gif-card-content">
                {content}
            </div>
            <button className="text-gif-card-button">Edit({count})</button>
        </div>
    );
}

export default Card;
