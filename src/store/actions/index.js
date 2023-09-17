import { ADDIMG } from '../types/index';

export function addImg(img) {
  return {
    type: ADDIMG,
    img
  }
}
