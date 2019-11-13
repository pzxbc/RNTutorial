# FlatList

`FlatList`组件应该是应用中一定会用到的组件了。衍生自`ScrollView`组件，但是当需要渲染的数据项很多的时候，FlatList只会渲染当前可见的数据项


## 基础例子

要使用`FlatList`渲染数据项，需要向其提供`data`、`renderItem`以及`keyExtractor`三个参数

`data`是个`Array`

向`FlatList`提供需要渲染的数据项。其结构是个`Array`

`renderItem`

接收一个来自`data`的数据项，返回它的渲染元素

为了提高FlatList rerender的性能，renderItem返回的渲染元素，应该设置`key`。如果没有设置的话，需要给`FlatList`提供`keyExtractor`函数，FlatList会依据其返回值自动给数据的渲染元素设置`key`

`keyExtractor`

一个函数，接收`data`中的某个数据项以及`index`，返回一个唯一的key，用于设置数据项渲染组件的`key`
如果不提供`keyExtractor`函数，默认行为是返回`item.key`作为key
keyExtractor返回值需要是`string`类型

keyExtractor函数在FlatList 渲染的过程中会调用多次。原因不明确，估计跟FlatList的实现有关。元素组件只会render一次

## 头部组件渲染

`FlatList`组件支持定制头部组件

```tsx
private renderHeader = () => (
  <View><Text>Header</Text></View>
)

<FlatList
  ...
  ListHeaderCompoents={this.renderHeader}
  ...
/>
```

## IOS渲染空白 需要滑动一次才会显示

因为设置了这个参数

```
removeClipped = {true}
```

要跨平台兼容的话，最好是默认设置。不然需要针对平台特定设置。


## 数据操作

### 刷新

refreshing

refresh 数据
onRefresh操作

onRefresh 触发refresh操作，通过设置refresh的值，来显示refresh控件

```tsx
private onRefresh = () => {
  this.setState({refreshing: true})
}

render () {
  return (
    <FlatList 
      ...
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh}
      ...
    />
  )
}
```

如果当前在`Refreshing`的状态，再次下拉不会导致`onRefresh`调用。

刷新过程中，我们可以在`compoentDidUpdate`函数中处理网络数据加载。`componentDidUpdate`函数在`props`以及`state`更新后才会调用。**注意一定要检查`refreshing`是否发生变化，不然也有可能在`refreshing=true`的过程中，其他操作导致了`componentUpdate`调用**

```tsx
componentDidUpdate (prevProps, prevState) {
  console.log('didUpdate', prevState)
  if (this.state.refreshing == true) {
    // do network data loading
    setTimeout(() => this.setState({refreshing: false}), 2000)
  }
  
```

## 下拉加载数据

onEndReached只会调用一次。如果调用后，FlatList内容没有变化的话，onEndReached不会再次调用
因此想做下拉数据加载，不能只使用`onEndReached`去做网络数据加载，因为可能因为网络波动导致`onEndReached`加载数据失败，那么后续就没法加载数据了。还需要做一个滑到底部就加载数据的接口。

滑动到底部检测，我们在`onMomentumScrollEnd`中做。每次滑动停止后，`FlatList`就会调用`onMomentumScrollEnd`回调。

```tsx
private onMomentumScrollEnd = ({nativeEvent}) => {
  console.log('onMomentumScrollEnd')
  const { contentOffset, contentSize, layoutMeasurement } = nativeEvent
  // 底部40的区域都算到底部了
  const endAreaHeight = 40
  if (contentOffset.y + layoutMeasurement.height > (contentSize.height - endAreaHeight)) {
    console.log('onScrollView end reached')
  }
}
```

FlatList继承自ScrollView。因此区域的尺寸跟ScrollView的设定是一样的

[scrollView尺寸图片]

下拉加载数据，通过`loading`状态，确保不会同一时刻多次加载数据。通过FootComponent显示数据加载状态

```tsx
const Footer = (props) => (
  <View style={{justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator />
  </View>
)

class FlatListLoadMore extends React.Component {
  construct(props) {
    super(props) {
      this.state = {
        ...
        loading: false,
        ...
      }
    }
  }

  private renderFooter = () => {
    return (this.state.loading? (<Footer />) : (null))
  }

  private loadMoreData = () => {
    console.log('loadMoreData', (new Date()).toString())
    setTimeout(() => this.setState({loading: false}), 2000)
  }

  componentDidUpdate (prevProps, prevState) {
    ...
    if (prevState.loading !== this.state.loading) {
      if(this.state.loading == true) {
        this.loadMoreData()
      }
    }
    ...
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
      <FlatList 
        ...
        ListFooterComponent={this.renderFooter}
        onEndReached={this.onEndReached}
        onMomentumScrollEnd={this.onMomentumScrollEnd}
        ...
      />
    )
  }
}
```

上述代码可以实现EndThreshold阈值达到调用onEndReached加载数据，或者onEndReached加载失败时，手动拉到底加载数据。并且保证了loadMoreData同一时刻只会被调用一次

上述代码通过FooterComponent来显示加载中的状态，对用户更友好些。但是这个控件会在特定情况下导致onEndReached循环调用：

onEndReached调用 => 数据加载失败或者无更多数据 =>loading状态取消=>FooterComponent不绘制=>FlatList 内容区域大小改变 => 触发再次检测EndThreshold => 再次调用onEndReached

一种可行的改造方案是:修改Footer的渲染内容，始终为固定尺寸。通过内部显示的内容来区分是否处于加载中。

```tsx
const Footer = (props) => (
  <View style={{height: 48, justifyContent: 'center', alignItems: 'center'}}>
    {props.loading? <ActivityIndicator /> : <Text>暂无更多数据</Text>}
  </View>
)

private renderFooter = () => (<Footer loading={this.state.loading} />)
```
