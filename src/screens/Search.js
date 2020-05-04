import React, { useState, useContext } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Constant from 'expo-constants'
import { useTheme } from '@react-navigation/native'
import Context from '../context/Context'

import MiniCard from '../components/MiniCard'

const Search = ({ navigation }) => {
  const [text, setText] = useState('')
  const context = useContext(Context)
  const { youtubeData, getYoutubeData } = context
  const [loading, setLoading] = useState(false)
  const { colors } = useTheme()

  const onPress = async () => {
    setLoading(true)
    await getYoutubeData(text)
    setLoading(false)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.header, { backgroundColor: colors.headerColor }]}>
        <MaterialIcons
          name='arrow-back'
          size={28}
          style={{ width: '10%', color: colors.iconColor }}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={{
            backgroundColor: '#e6e6e6',
            width: '70%',
            padding: 2,
            borderRadius: 2,
          }}
        />
        <MaterialIcons
          name='send'
          size={28}
          style={{ width: '10%', color: colors.iconColor }}
          onPress={onPress}
        />
      </View>
      {loading ? (
        <ActivityIndicator size='large' color='red' />
      ) : (
        <FlatList
          data={youtubeData}
          renderItem={({ item }) => (
            <MiniCard
              id={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
              publishedAt={item.snippet.publishedAt}
            />
          )}
          keyExtractor={(item) => item.id.videoId}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: Constant.statusBarHeight,
    marginBottom: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 4,
  },
})

export default Search
