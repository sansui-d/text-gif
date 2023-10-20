import React from 'react';
import './index.less';

function Button(props) {
    const { text, icon, onClick, btnRef } = props
    return (
        <button className="text-gif-button" ref={btnRef} onClick={onClick} >
            {icon}{text}
        </button>
    );
}

export default Button;
