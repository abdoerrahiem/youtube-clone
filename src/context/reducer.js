import * as types from './types'

export default (state, action) => {
  switch (action.type) {
    case types.GET_YOUTUBE_DATA:
      return {
        ...state,
        youtubeData: action.payload,
      }
    case types.CHANGE_TO_DARK_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    default:
      return state
  }
}
