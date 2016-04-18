import React, { Navigator, BackAndroid } from 'react-native';
import { Loading } from './loading';

export const WineApp = React.createClass({
  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackButton);
  },

  handleBackButton() {
    if (!this.isOnMainScreen) {
      this.navigator.pop();
      return true;
    }
    return false;
  },

  configureScene(route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return Navigator.SceneConfigs.FloatFromBottom;
  },

  renderScene(route, nav) {
    if (!this.navigator) {
      this.navigator = nav;
      BackAndroid.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    // return view for each route
  },

  render() {
    return (
        <Loading what=": à vous de coder !!!" />
    );
  }
});
