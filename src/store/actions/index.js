import { ADDIMG, REPLACEIMG, RESETIMG } from '../types/index';

export function addImg(imgs) {
  return {
    type: ADDIMG,
    imgs
  }
}
export function replaceImg(imgs, index) {
  return {
    type: REPLACEIMG,
    imgs,
    index
  }
}
export function resetImg() {
  return {
    type: RESETIMG,
  }
}
