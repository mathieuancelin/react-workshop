import React, { PropTypes, Text, TouchableHighlight, View } from 'react-native';
import { styles } from './style';

export const RegionCell = React.createClass({
  propTypes: {
    onSelect: PropTypes.func,
    region: PropTypes.string
  },
  render() {
    return (
      <TouchableHighlight onPress={this.props.onSelect}>
        <View style={styles.container}>
          <Text style={styles.cellTitle}>
            {this.props.region}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
});
