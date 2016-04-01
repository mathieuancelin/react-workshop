/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes, ListView } from 'react-native';

import { connect } from 'react-redux';
import { fetchWinesForRegion, setTitle } from '../actions';
import { Loading } from './loading';
import { Wine } from './wine';
import { WineCell } from './wine-cell';
import { styles } from './style';

const mapStateToProps = (state) => {
  return {
    wines: state.wines,
    httpState: state.http.state
  };
}

export const WineList = connect(mapStateToProps)(React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func
    }),
    region: PropTypes.string,
    wines: PropTypes.object
  },

  getInitialState() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentDidMount() {
    this.props.dispatch(setTitle(`Vins de ${this.props.region}`));
    this.props.dispatch(fetchWinesForRegion(this.props.region));
  },

  componentDidUpdate(prevProps) {
    if (prevProps.wines !== this.props.wines) {
      this.setState({
        loaded: true,
        dataSource: this.state.dataSource.cloneWithRows(this.props.wines[this.props.region].data)
      });
    }
  },

  selectWine(wine) {
    this.props.navigator.push({
      title: `${wine.name}`,
      component: Wine,
      passProps: {
        wine,
        region: this.props.region
      }
    });
  },

  renderWine(wine) {
    return(
      <WineCell
          onSelect={() => this.selectWine(wine)}
          wine={wine} />
    );
  },

  render() {
    if (!this.state.loaded) {
      return(
        <Loading what={`Vins de ${this.props.region}`} />
      );
    }
    return (
      <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderWine} />
    );
  }
}));
