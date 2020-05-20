import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Context from '../context/Context'

import Header from '../components/Header'
import Card from '../components/Card'

const scrollY = new Animated.Value(0)
const diffClamp = Animated.diffClamp(scrollY, 0, 45)
const translateY = diffClamp.interpolate({
  inputRange: [0, 45],
  outputRange: [0, -45],
})

const Home = () => {
  const context = useContext(Context)
  const { youtubeData } = context
  const { colors } = useTheme()

  useEffect(() => {
    youtubeData
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={styles.animatedView}>
        <Header />
      </Animated.View>
      {youtubeData.length > 0 ? (
        <FlatList
          data={youtubeData}
          renderItem={({ item }) => (
            <Card
              id={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              publishedAt={item.snippet.publishedAt}
            />
          )}
          keyExtractor={(item) => item.id.videoId}
          onScroll={(e) => scrollY.setValue(e.nativeEvent.contentOffset.y)}
        />
      ) : (
        <View style={styles.center}>
          <Text style={[styles.text, { color: colors.iconColor }]}>
            Videos Empty!
          </Text>
        </View>
      )}
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
  animatedView: {
    transform: [{ translateY }],
    elevation: 4,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
})

export default Home
