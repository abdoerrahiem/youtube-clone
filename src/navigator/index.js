import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Context from '../context/Context'

import Home from '../screens/Home'
import Search from '../screens/Search'
import VideoPlayer from '../screens/VideoPlayer'
import Explore from '../screens/Explore'
import Subscribe from '../screens/Subscribe'

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: 'black',
    iconColor: '#fff',
    tabIcon: '#fff',
  },
}

const customWhiteTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: '#fff',
    iconColor: 'black',
    tabIcon: 'red',
  },
}

const Stack = createStackNavigator()
const Tab = createMaterialBottomTabNavigator()

const homeTabs = () => {
  const { colors } = useTheme()

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = 'home'
          } else if (route.name === 'Explore') {
            iconName = 'explore'
          } else if (route.name === 'Subscriptions') {
            iconName = 'subscriptions'
          }

          return <MaterialIcons name={iconName} size={25} color={color} />
        },
      })}
      activeColor={colors.tabIcon}
      barStyle={{ backgroundColor: colors.headerColor }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Explore' component={Explore} />
      <Tab.Screen name='Subscriptions' component={Subscribe} />
    </Tab.Navigator>
  )
}

const Navigator = () => {
  const context = useContext(Context)
  const { darkTheme } = context

  return (
    <NavigationContainer theme={darkTheme ? customDarkTheme : customWhiteTheme}>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='homeScreen' component={homeTabs} />
        <Stack.Screen name='searchScreen' component={Search} />
        <Stack.Screen name='videoPlayerScreen' component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
