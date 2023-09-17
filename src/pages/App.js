import React from 'react';
import { useDispatch, useSelector } from "react-redux"
import { addImg } from '../store/actions'
import SuperGif from '../utils/libgif';
import './App.less';

function App() {
  const dispatch = useDispatch()
  const { img } = useSelector((state) => {
    return state
  })
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
          superGif.load(function () {
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
  return (
    <div className="text-gif-app">
      <label
        htmlFor="input"
        className='text-gif-label'
      >
        <strong>Upload Your Gif</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>
        <div id="glow">
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </label>
      <input
        type="file"
        id="input"
        hidden={true}
        accept=".gif"
        onClick={(e) => (e.target.value = null)}
        onChange={(e) => handleUpload(e)}
      />
      {img.map((item) => (<img key={item} src={item}></img>))}
    </div>
  );
}

export default App;
