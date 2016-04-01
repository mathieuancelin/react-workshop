import React, { PropTypes, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './style';

export const WineCell = React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
    wine: PropTypes.shape({
      name: PropTypes.string
    })
  },
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.cellTitle}>
            {this.props.wine.name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});
