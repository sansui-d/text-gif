import { ADDIMG, REPLACEIMG, RESETIMG } from '../types/index'

const rootState = {
  imgs: []
}
export default function reducers(state = rootState, actions) {
  switch (actions.type) {
    case ADDIMG: {
      const imgs = [...state.imgs, actions.imgs]
      return { ...state, imgs: imgs }
    }
    case REPLACEIMG: {
      const imgs = [...state.imgs]
      imgs.splice(actions.index, 1, actions.imgs);
      return { ...state, imgs: imgs }
    }
    case RESETIMG: {
      return { ...state, imgs: [] }
    }
    default:
      return state
  }
}