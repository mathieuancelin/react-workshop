import React, { PropTypes, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const Button = React.createClass({
  propTypes: {
    action: PropTypes.func,
    style: PropTypes.object,
    title: PropTypes.string,
    titleStyle: PropTypes.object
  },
  getDefaultProps() {
    return {
      action() {},
      style: {},
      titleStyle: {},
      title: ''
    };
  },
  handleAction() {
    (this.props.action || function() {})();
  },
  render() {
    return (
      <View
          onPress={this.handleAction}
          style={[styles.button, this.props.style]}>
        <Text
            onPress={this.handleAction}
            style={this.props.titleStyle}>
          {this.props.title || this.props.children}
        </Text>
      </View>
    );
  }
});
