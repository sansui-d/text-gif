import { ADDIMG } from '../types/index'

const rootState = {
    img: []
}
export default function reducers(state = rootState, actions) {
  switch (actions.type) {
    case ADDIMG: {
      const img = [...state.img, actions.img]
      return { ...state, img: img }
    }
    default:
      return state
  }
}