import React from 'react'
import { View, Text, StyleSheet, Button, FlatList, ActivityIndicator } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view'

class Header extends React.Component {
  render () {
    return (
      <View style={{height: 54, backgroundColor: 'antiquewhite', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>FlatList Header</Text>
      </View>
    )
  }
}

const Separator = (props) => (<View style={{padding: 5}}><Text>Item Separator</Text></View>)

const Footer = (props) => (
  <View style={{height: 48, justifyContent: 'center', alignItems: 'center'}}>
    {props.loading? <ActivityIndicator /> : <Text>暂无更多数据</Text>}
  </View>
)

class Item extends React.Component {
  render () {
    const { data } = this.props
    // console.log('Item render Once in FlatList render', data.id, data.title)
    return (
      <View style={{backgroundColor: '#F9C2FF', padding: 5}}>
        <Text style={{fontSize: 20}}>{data.title}</Text>
      </View>
    )
  }
}

class FlatListSimple extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      loading: false,
    }
    this.data = [
      { id: '1', title: 'First Item', },
      { id: '2', title: 'Second Item', },
      { id: '3', title: 'Third Item', },
      { id: '4', title: 'Third Item', },
      { id: '5', title: 'Third Item', },
      { id: '6', title: 'Third Item', },
      { id: '7', title: 'Third Item', },
      { id: '8', title: 'Third Item', },
      { id: '9', title: 'Third Item', },
      { id: '10', title: 'Third Item', },
      { id: '11', title: 'Third Item', },
    ]
  }

  private renderItem = ({item}) => (<Item data={item} />)

  private renderFooter = () => (<Footer loading={this.state.loading} />)

  // 应该返回string类型
  private keyExtractor = (item, index) => {
    // console.log('keyExtractor call multiple times', item.id, index)
    return item.id
  }

  private onRefresh = () => {
    console.log('FlatList onRefresh', (new Date()).toString())
    console.log("it doesn't call again if in refreshing")
    this.setState({refreshing: true})
  }

  private refreshData = () => {
    console.log('refreshData', (new Date()).toString())
    // do network data loading
    setTimeout(() => this.setState({refreshing: false}), 2000)
  }
  private loadMoreData = () => {
    console.log('loadMoreData', (new Date()).toString())
    setTimeout(() => this.setState({loading: false}), 2000)
  }

  componentDidUpdate (prevProps, prevState) {
    console.log('didUpdate', prevState)
    if (prevState.refreshing !== this.state.refreshing) {
      if (this.state.refreshing == true) {
        this.refreshData()
      }
    }

    if (prevState.loading !== this.state.loading) {
      if(this.state.loading == true) {
        this.loadMoreData()
      }
    }
  }

  private onEndReached = () => {
    console.log('onEndReached')

    this.setState({loading: true})
  }

  private onMomentumScrollEnd = ({nativeEvent}) => {
    console.log('onMomentumScrollEnd')
    const { contentOffset, contentSize, layoutMeasurement } = nativeEvent
    // 底部40的区域都算到底部了
    const endAreaHeight = 40
    if (contentOffset.y + layoutMeasurement.height > (contentSize.height - endAreaHeight)) {
      console.log('onScrollView end reached')
      this.setState({loading: true})
    }
  }

  render () {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          style={{flex: 1}}
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={Header}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={this.renderFooter}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
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

export default FlatListSimple
