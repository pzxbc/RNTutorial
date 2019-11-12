/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import AppContainer from './src/RootStackNavigator'

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}
