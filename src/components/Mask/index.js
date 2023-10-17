import React from 'react';
import Content from './components/Content';
import './index.less';

function Mask(props) {
    const { showMask, setShowMask, img } = props;
    const handleClose = () => {
        setShowMask(false)
    }
    return (
        <>
            {showMask ?
                <div className="text-gif-mask">
                    <div className='text-gif-mask-close' onClick={handleClose}>close</div>
                    <Content img={img} onClose={handleClose} />
                </div> : null}
        </>

    );
}

export default Mask;
