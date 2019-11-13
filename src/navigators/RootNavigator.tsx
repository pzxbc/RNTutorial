import React from 'react'
import { createAppContainer, CreateNavigatorConfig } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import * as Screens from '../screens'

const routeConfigMap = {
  FlatListSimple: {
    screen: Screens.FlatListSimple
  }
}

const stackConfig = {
  initialRouteName: 'FlatListSimple',
  headerMode: 'screen',
}

const StackNavigator = createStackNavigator(routeConfigMap, stackConfig)
const AppContainer = createAppContainer(StackNavigator)

export default AppContainer