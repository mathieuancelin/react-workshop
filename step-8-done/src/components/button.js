import React, { PropTypes, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export const Button = React.createClass({
  propTypes: {
    action: PropTypes.func
  },
  onAction() {
    (this.props.action || function() {})();
  },
  render() {
    return (
      <View onPress={this.onAction} style={[styles.button, this.props.style || {}]}>
        <Text onPress={this.onAction} style={this.props.titleStyle || {}}>{this.props.title || this.props.children}</Text>
      </View>
    );
  }
});
