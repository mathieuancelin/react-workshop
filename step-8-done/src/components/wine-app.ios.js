import React, { PropTypes, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import { Regions } from './regions';
import { styles } from './style';

const mapStateToProps = (state) => {
  return {
    title: state.title,
    httpState: state.http.state,
    httpError: state.http.error
  };
}

export const WineApp = connect(mapStateToProps)(React.createClass({
  propTypes: {
    children: PropTypes.element,
    dispatch: PropTypes.func.isRequired,
    httpError: PropTypes.string,
    httpState: PropTypes.string,
    title: PropTypes.string.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    return (
      <NavigatorIOS
        style={styles.navigatorios}
        initialRoute={{
          title: 'Régions viticoles',
          component: Regions
        }} />
    );
  }

}));
