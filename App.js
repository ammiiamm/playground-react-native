import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HomeScreen from './src/HomeScreen';
import RegisterScreen from './src/RegisterScreen';
import AppNavigator from './src/AppNavigator';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <AppNavigator/>
    );
  }
}
