import React, {
  PropTypes,
  ProgressBar,
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
          <ProgressBar
              progress={1}
              style={styles.progress}
              styleAttr="LargeInverse" />
        </View>
      </View>
    );
  }
});
