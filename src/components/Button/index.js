import React from 'react';
import './index.less';

function Button(props) {
    const { text, onClick, btnRef } = props
    return (
        <button className="text-img-button" ref={btnRef} onClick={onClick} >
            {text}
        </button>
    );
}

export default Button;
