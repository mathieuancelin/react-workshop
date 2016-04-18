import React, {
  PropTypes,
  ActivityIndicatorIOS,
  Text,
  View
} from 'react-native';
import { styles } from './style';

export const Loading = React.createClass({
  propTypes: {
    what: PropTypes.string
  },
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.screenCentered}>
          <Text style={styles.centeredAndBig}>
            Loading {this.props.what}
          </Text>
          <ActivityIndicatorIOS
              style={styles.progress}
              animating
              size="large" />
        </View>
      </View>
    );
  }
});
