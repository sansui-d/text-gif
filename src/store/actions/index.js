import { ADDIMG, REPLACEIMG } from '../types/index';

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
