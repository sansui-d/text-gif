import React from 'react';
import './index.less';

function Button() {

    return (
        <button className="text-gif-button">
            <strong>SPACE</strong>
            <div id="container-stars">
                <div id="stars"></div>
            </div>

            <div id="glow">
                <div className="circle"></div>
                <div className="circle"></div>
            </div>
        </button>
    );
}

export default Button;
