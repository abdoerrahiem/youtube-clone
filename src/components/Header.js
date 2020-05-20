import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  AntDesign,
  MaterialCommunityIcons,
  EvilIcons,
} from '@expo/vector-icons'
import Constant from 'expo-constants'
import { useNavigation, useTheme } from '@react-navigation/native'
import Context from '../context/Context'

const Header = () => {
  const navigation = useNavigation()
  const { colors } = useTheme()
  const icon = {
    marginLeft: 15,
    color: colors.iconColor,
  }

  const context = useContext(Context)
  const { changeToDarkTheme } = context

  return (
    <View style={[styles.header, { backgroundColor: colors.headerColor }]}>
      <View style={styles.left}>
        <AntDesign name='youtube' size={28} color='red' />
        <Text style={[styles.text, { color: icon.color }]}>YouTube</Text>
      </View>
      <View style={styles.right}>
        <MaterialCommunityIcons
          name='camcorder'
          size={28}
          color='#212121'
          style={icon}
        />
        <EvilIcons
          name='search'
          size={28}
          color='#212121'
          style={icon}
          onPress={() => navigation.navigate('searchScreen')}
        />
        <MaterialCommunityIcons
          name='account-circle'
          size={28}
          color='#212121'
          style={icon}
          onPress={() => changeToDarkTheme()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    //marginTop: Constant.statusBarHeight,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 4,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#212121',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Header
