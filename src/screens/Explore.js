import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import Context from '../context/Context'

import Header from '../components/Header'
import ExploreCard from '../components/ExploreCard'
import Card from '../components/Card'

const Explore = () => {
  const context = useContext(Context)
  const { youtubeData } = context
  const { colors } = useTheme()

  useEffect(() => {
    youtubeData
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.explore}>
              <ExploreCard name='Gaming' />
              <ExploreCard name='Trending' />
              <ExploreCard name='Music' />
              <ExploreCard name='News' />
              <ExploreCard name='Movies' />
              <ExploreCard name='Fashion' />
            </View>
            <Text style={[styles.text, { color: colors.iconColor }]}>
              Trending Videos
            </Text>
            {youtubeData.length === 0 && (
              <View style={styles.center}>
                <Text style={[styles.textEmpty, { color: colors.iconColor }]}>
                  No trending videos!
                </Text>
              </View>
            )}
          </>
        }
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
    </View>
  )
}

const styles = StyleSheet.create({
  explore: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  text: {
    marginHorizontal: 8,
    marginBottom: 8,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingVertical: 5,
  },
  center: {
    alignItems: 'center',
  },
  textEmpty: {
    fontSize: 14,
    fontWeight: 'normal',
  },
})

export default Explore
