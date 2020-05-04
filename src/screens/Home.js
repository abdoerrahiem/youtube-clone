import React, { useContext, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Context from '../context/Context'

import Header from '../components/Header'
import Card from '../components/Card'

const Home = () => {
  const context = useContext(Context)
  const { youtubeData } = context
  const { colors } = useTheme()

  useEffect(() => {
    youtubeData
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header />
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
})

export default Home
