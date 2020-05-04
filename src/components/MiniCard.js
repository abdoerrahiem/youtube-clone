import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { key } from '../key/key'
import moment from 'moment'
import numeral from 'numeral'
import { useNavigation, useTheme } from '@react-navigation/native'

const MiniCard = ({ id, title, channel, publishedAt }) => {
  const [viewCount, setViewCount] = useState('')

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${key}`
      )
      const data = await res.json()
      setViewCount(data.items)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const navigation = useNavigation()

  const { colors } = useTheme()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('videoPlayerScreen', { id, title })}
    >
      <View style={styles.miniCard}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text
            ellipsizeMode='tail'
            numberOfLines={3}
            style={[styles.title, { color: colors.iconColor }]}
          >
            {title}
          </Text>
          <Text style={styles.text}>{channel}</Text>
          <Text style={styles.text}>
            {moment(publishedAt).startOf('hour').fromNow()} .{' '}
            {viewCount &&
              viewCount.length > 0 &&
              viewCount.map((count) =>
                numeral(count.statistics.viewCount).format('0a').toUpperCase()
              )}{' '}
            views
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  miniCard: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  image: {
    width: '50%',
    height: 90,
  },
  details: {
    width: '40%',
    padding: 3,
  },
  text: {
    fontSize: 10,
    color: '#636362',
    lineHeight: 12,
  },
  title: {
    lineHeight: 15,
    fontSize: 14,
    marginBottom: 5,
  },
})

export default MiniCard
