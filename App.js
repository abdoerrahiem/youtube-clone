import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import State from './src/context/State'

import Navigator from './src/navigator'

const App = () => (
  <State>
    <Navigator />
  </State>
)

export default App
