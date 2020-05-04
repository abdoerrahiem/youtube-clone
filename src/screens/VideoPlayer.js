import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Constant from 'expo-constants'
import { WebView } from 'react-native-webview'

const VideoPlayer = ({ route }) => {
  const { id, title } = route.params

  return (
    <View style={styles.videoPlayer}>
      <View style={styles.video}>
        <WebView
          source={{ uri: `https://www.youtube.com/embed/${id}` }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
      <Text style={styles.text} ellipsizeMode='tail' numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.border} />
    </View>
  )
}

const styles = StyleSheet.create({
  videoPlayer: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
  },
  video: {
    width: '100%',
    height: 200,
  },
  text: {
    fontSize: 18,
    width: '95%',
    margin: 9,
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
})

export default VideoPlayer
