import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

class Home extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    return {
      header: null
    }
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <Button 
          title="FlatListSimple"
          onPress={() => this.props.navigation.navigate('FlatListSimple')}
        />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default Home
