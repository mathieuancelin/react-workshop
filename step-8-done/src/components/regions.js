/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes, ListView } from 'react-native';

import { connect } from 'react-redux';
import { fetchRegions, setTitle } from '../actions';
import { RegionCell } from './region-cell';
import { WineList } from './wine-list';
import { Loading } from './loading';
import { styles } from './style';

const mapStateToProps = (state) => {
  return {
    regions: state.regions.data,
    httpState: state.http.state
  };
}

export const Regions = connect(mapStateToProps)(React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    navigator: PropTypes.shape({
      push: PropTypes.func
    }),
    regions: PropTypes.arrayOf(PropTypes.string)
  },

  getInitialState() {
    return {
      loaded: false,
      dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 })
    };
  },

  componentDidMount() {
    this.props.dispatch(setTitle(`Régions viticole`));
    this.props.dispatch(fetchRegions());
  },

  componentDidUpdate(prevProps) {
    if (prevProps.regions !== this.props.regions) {
      this.setState({
        loaded: true,
        dataSource: this.state.dataSource.cloneWithRows(this.props.regions)
      });
    }
  },

  selectRegion(region) {
    this.props.navigator.push({
      title: `Vins de ${region}`,
      component: WineList,
      passProps: {
        region
      }
    });
  },

  renderRegion(region) {
    return(
      <RegionCell
          onSelect={() => this.selectRegion(region)}
          region={region} />
    );
  },

  render() {
    if (!this.state.loaded) {
      return(
        <Loading what="Régions viticole" />
      );
    }
    return (
      <ListView style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRegion} />
    );
  }
}));
