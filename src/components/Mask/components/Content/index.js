import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from "react-redux"
import { replaceImg } from '../../../../store/actions'
import Button from '../../../../components/Button';
import ColorPicker from '../../../../components/ColorPicker';
import { dataURLtoBlob, blobToFile, fileToBase64 } from '../../../../utils/file'
import './index.less';

const options = [
    {
        name: 'Reset',
        type: 'reset',
    },
    {
        name: 'Add-Text',
        type: 'add-text',
    },
    {
        name: 'Color',
        type: 'color',
    },
    {
        name: 'Download',
        type: 'download',
    }
]
function Content(props) {
    const { img, onClose } = props;
    const dispatch = useDispatch()
    const maskRef = useRef(null);
    const canvas = useRef(null);
    const handleAddText = () => {
        const itext = new fabric.Textbox('Enter Your Text', {
            left: 0,
            top: 0,
            width: 130,
            fontSize: 20,
            transparentCorners: false,
            borderColor: '#2d8cf0',
            cornerColor: "#2d8cf0",
            cornerStyle: 'circle',
        });
        canvas.current.add(itext).setActiveObject(itext);
    }
    const changeImg = () => {
        fabric.Image.fromURL(
            img.src,
            (img) => {
                canvas.current.setBackgroundImage(
                    img,
                    canvas.current.renderAll.bind(canvas.current),
                    {
                        scaleX: img.width > 800 ? canvas.current.width / img.width : 1,
                        scaleY: img.height > 600 ? canvas.current.height / img.height : 1
                    }
                )
            }
        )
    }
    const handleChangeColor = (color) => {
        const activeTxt = canvas.current.getActiveObjects();
        if (!activeTxt) return
        activeTxt.forEach((item) => {
            item.set('fill', color)
        })
        canvas.current.renderAll()
    }
    const handleClick = (type) => {
        switch (type) {
            case 'reset':
                canvas.current.setViewportTransform([1, 0, 0, 1, 0, 0]);
                break;
            case 'add-text':
                handleAddText()
                break;
            case 'color':
                break;
            case 'download':
                handleDownload()
                break
            default:
                break;
        }
    }
    const handleKeydown = (e) => {
        if (e.target.tagName === 'TEXTAREA') return
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const activeTxt = canvas.current.getActiveObjects();
            if (!activeTxt) return

            activeTxt.map((item) => {
                canvas.current.remove(item)
            })
            canvas.current.discardActiveObject()
            canvas.current.renderAll()
        }
    }
    useEffect(() => {
        canvas.current = canvas.current
            || new fabric.Canvas('canvas', {
                width: img.width > 800 ? 800 : img.width, height: img.height > 600 ? 600 : img.height,
            })

        fabric.Object.prototype.cornerStyle = "circle";
        fabric.Object.prototype.cornerColor = "#2d8cf0";
        fabric.Object.prototype.borderColor = '#2d8cf0';
        fabric.Object.prototype.transparentCorners = false;
        canvas.current.hoverCursor = 'pointer';
        fabric.Image.fromURL(
            img.src,
            (i) => {
                canvas.current.setBackgroundImage(
                    i,
                    canvas.current.renderAll.bind(canvas.current),
                )
            }
        )
        canvas.current.on('mouse:wheel', opt => {
            const delta = opt.e.deltaY
            let zoom = canvas.current.getZoom()
            zoom *= 0.999 ** delta
            if (zoom > 20) zoom = 20
            if (zoom < 0.01) zoom = 0.01
            canvas.current.zoomToPoint(
                {
                    x: opt.e.offsetX,
                    y: opt.e.offsetY
                },
                zoom
            )
        })
        canvas.current.on('mouse:down', opt => {
            let evt = opt.e
            if (evt.altKey === true) {
                canvas.current.isDragging = true
                canvas.current.lastPosX = evt.clientX
                canvas.current.lastPosY = evt.clientY
            }
        })

        canvas.current.on('mouse:move', opt => {
            if (canvas.current.isDragging) {
                let evt = opt.e
                let vpt = canvas.current.viewportTransform
                vpt[4] += evt.clientX - canvas.current.lastPosX
                vpt[5] += evt.clientY - canvas.current.lastPosY
                canvas.current.requestRenderAll()
                canvas.current.lastPosX = evt.clientX
                canvas.current.lastPosY = evt.clientY
            }
        })

        canvas.current.on('mouse:up', opt => {
            canvas.current.setViewportTransform(canvas.current.viewportTransform)
            canvas.current.isDragging = false
        })
        changeImg()
        document.addEventListener('keydown', handleKeydown)
    }, []);
    const handleDownload = async () => {
        const url = canvas.current.toDataURL()
        const blob = dataURLtoBlob(url)
        const file = blobToFile(blob, 'imgFile')
        const imgUrl = await fileToBase64(file)
        dispatch(replaceImg(imgUrl, img.id))
        onClose()
    }
    return (
        <div className="text-gif-mask-content">
            <div className='text-gif-mask-img' ref={maskRef}>
                <canvas id="canvas" style={{
                    border: '1px solid #ccc'
                }}></canvas>
            </div>
            <div className='text-gif-mask-tool'>
                {options.map((item) => (
                    <div
                        className='text-gif-mask-tool-item'
                        onClick={() => handleClick(item.type)}
                        key={item.type}
                    >{item.type === 'color' ?
                        <ColorPicker text={item.name} onChange={handleChangeColor} /> : <Button text={item.name} />}
                    </div>))}
            </div>
        </div>
    );
}

export default Content;
