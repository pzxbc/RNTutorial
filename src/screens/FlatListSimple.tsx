import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

class FlatListSimple extends React.Component {
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Text>HomeTest</Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default FlatListSimple
