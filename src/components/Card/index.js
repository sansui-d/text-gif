import React from 'react';
import './index.less';

function Card(props) {
    const { content, onClick } = props

    return (
        <div className="text-gif-card" onClick={onClick} >
            <div class="text-gif-card-content">
                {content}
            </div>
            <button class="text-gif-card-button">Edit</button>
        </div>
    );
}

export default Card;
