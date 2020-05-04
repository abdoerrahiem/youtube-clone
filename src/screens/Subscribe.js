import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

import Header from '../components/Header'

const Subscribe = () => {
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.center}>
        <Text style={[styles.text, { color: colors.iconColor }]}>
          Subscribe screen
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Subscribe
