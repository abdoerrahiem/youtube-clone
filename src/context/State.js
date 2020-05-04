import React, { useReducer } from 'react'
import reducer from './reducer'
import Context from './Context'
import * as types from './types'
import { key } from '../key/key'

const initialState = {
  youtubeData: [],
  darkTheme: false,
}

const State = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Get youtube data
  const getYoutubeData = async (text) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${text}&type=video&key=${key}`
      )
      const data = await res.json()
      dispatch({ type: types.GET_YOUTUBE_DATA, payload: data.items })
    } catch (err) {
      console.log(err.message)
    }
  }

  // Change to DarkTheme
  const changeToDarkTheme = () => {
    dispatch({ type: types.CHANGE_TO_DARK_THEME })
  }

  return (
    <Context.Provider
      value={{
        youtubeData: state.youtubeData,
        darkTheme: state.darkTheme,
        getYoutubeData,
        changeToDarkTheme,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default State
