import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ExploreCard = ({ name }) => {
  return (
    <View style={styles.exploreCard}>
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  exploreCard: {
    backgroundColor: 'red',
    width: 150,
    height: 40,
    borderRadius: 3,
    justifyContent: 'center',
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  },
})

export default ExploreCard
