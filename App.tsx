/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { View, Text } from 'react-native'
import AppContainer from './src/navigators/RootNavigator'

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}
