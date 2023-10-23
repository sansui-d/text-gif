import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import GIF from "gif.js";
import { addImg, resetImg } from '@store/actions'
import { worker } from "@utils/gif-worker";
import SuperGif from '@utils/libgif';
import Mask from '@components/Mask';
import Card from '@components/Card';
import './App.less';

function App() {
  const dispatch = useDispatch()
  const { imgs } = useSelector((state) => {
    return state
  })
  const [showMask, setShowMask] = useState(false);
  const [maskImg, setMaskImg] = useState(null)
  const imgListRef = useRef(null);
  const handleUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        const docImg = document.createElement("img");
        docImg.src = e.target.result;
        docImg.onload = function () {
            const superGif = new SuperGif({ gif: docImg });
            superGif.onError(function (e) {
              console.log(e);
            });
            superGif.load(function () {
              dispatch(resetImg())
              for (let i = 0; i < superGif.get_length(); i++) {
                superGif.move_to(i)
                const sImg = superGif.get_canvas().toDataURL('image/png');
                dispatch(addImg(sImg))
              }
            });
        }
      };
    }
  };
  const imgOnload = (gif) => {
    return new Promise((resolve, reject) => {
      imgs.forEach((item, index) => {
        let img = document.createElement("img");
        img.src = item
        img.onload = () => {
          gif.addFrame(img, {
            delay: 100,
          });
          if (index === imgs.length - 1) {
            resolve()
          }
        };
        img.onerror = () => {
          reject()
        }
      })
    })
  }
  const handleDownload = async () => {
    const gif = new GIF({
      workers: 2,
      quality: 10,
      workerScript: worker,
    });
    await imgOnload(gif)

    gif.on("progress", function (progress) {
      console.log(progress)
    });
    gif.on("finished", function (blob) {
      const a = document.createElement("a");
      a.setAttribute("href", URL.createObjectURL(blob));
      a.setAttribute("target", "download");
      a.setAttribute("download", "text-gif.gif");
      a.click();
    });
    gif.render();
  }
  useEffect(() => {
    imgListRef.current.addEventListener('click', (e) => {
      e.stopPropagation()
      e.stopImmediatePropagation()
      if (e.target?.tagName === 'IMG') {
        setMaskImg(e.target)
        setShowMask(true)
      }
    })
  })
  return (
    <div className="text-gif-app">
      <label
        htmlFor="input"
        className='text-gif-hover-button text-gif-upload'
      >
        Upload Gif
      </label>
      <input
        type="file"
        id="input"
        hidden={true}
        accept=".gif"
        onClick={(e) => (e.target.value = null)}
        onChange={(e) => handleUpload(e)}
      />
      <div className='text-gif-img-list' ref={imgListRef} >{imgs.map((item, index) => (<Card 
      count={`${index + 1}/${imgs.length}`}
      content={<img id={index} 
      draggable={false} 
      key={'img' + index} src={item} ></img>} />))}</div>
      <Mask img={maskImg} showMask={showMask} setShowMask={setShowMask} />
      <div className='text-gif-hover-button text-gif-download' onClick={handleDownload}>Download Gif</div>
    </div>
  );
}

export default App;
