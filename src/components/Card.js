import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { key } from '../key/key'
import moment from 'moment'
import numeral from 'numeral'
import { useNavigation, useTheme } from '@react-navigation/native'

const Card = ({ id, title, channel, publishedAt }) => {
  const [viewCount, setViewCount] = useState('')
  const { colors } = useTheme()

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

  return (
    <>
      {!id && !title && !channel && !publishedAt ? (
        <Text>No videos!</Text>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('videoPlayerScreen', { id, title })
          }
        >
          <View style={{ paddingBottom: 15 }}>
            <Image
              source={{
                uri: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
              }}
              style={styles.image}
            />
            <View style={styles.details}>
              <MaterialCommunityIcons
                name='account-circle'
                size={45}
                color={colors.iconColor}
                style={{ marginRight: 5 }}
              />
              <View style={{ width: '80%' }}>
                <Text
                  style={[styles.title, { color: colors.iconColor }]}
                  ellipsizeMode='tail'
                  numberOfLines={2}
                >
                  {title}
                </Text>
                <Text
                  style={[styles.titleDetails, { color: colors.iconColor }]}
                >
                  {channel} .{' '}
                  {viewCount &&
                    viewCount.length > 0 &&
                    viewCount.map((count) =>
                      numeral(count.statistics.viewCount)
                        .format('0a')
                        .toUpperCase()
                    )}{' '}
                  views . {moment(publishedAt).startOf('hour').fromNow()}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
  },
  details: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 12,
    padding: 3,
  },
  titleDetails: {
    fontSize: 10,
    color: '#212121',
    padding: 1,
  },
})

export default Card
