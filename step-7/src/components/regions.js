/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { fetchRegions, setTitle } from '../actions';

const computeRegionStyle = function(region, selected) {
  let style = {
    padding: 16,
    cursor: 'pointer'
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

export const Regions = React.createClass({
  propTypes: {
    onRegionChange: PropTypes.func,
    regions: PropTypes.arrayOf(PropTypes.string)
  },

  handleRegionClick(event) {
    this.props.onRegionChange(event.target.textContent);
  },

  render () {
    return (
      <div>
        {
          this.props.regions.map(region =>
            <div key={region}
                style={computeRegionStyle(region, null)}
                onClick={this.handleRegionClick}>
              {region}
            </div>
          )
        }
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    regions: state.regions.data,
    httpState: state.http.state
  };
}

export const RegionsPage = connect(mapStateToProps)(React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    httpState: PropTypes.string,
    regions: PropTypes.arrayOf(PropTypes.string)
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount() {
    this.props.dispatch(setTitle(`Regions`));
    this.props.dispatch(fetchRegions());
  },

  handleNavigateToRegion(region) {
    this.context.router.push({
      pathname: `/regions/${region}`
    });
  },

  render () {
    return (
      <Regions regions={this.props.regions}
          onRegionChange={this.handleNavigateToRegion} />
    );
  }
}));
