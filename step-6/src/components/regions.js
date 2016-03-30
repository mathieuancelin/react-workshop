/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes } from 'react';

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

export const RegionsPage = React.createClass({

  propTypes: {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    setTitle: PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return {
      regions: [],
      loaded: false,
      error: null
    };
  },

  componentDidMount() {
    fetch('/api/regions')
      .then(r => r.json())
      .then(data => {
        this.setState({ regions: data, loaded: true });
      })
      .catch(error => {
        this.setState({ error, loaded: true });
      });
  },

  handleNavigateToRegion(region) {
    this.context.router.push({
      pathname: `/regions/${region}`
    });
  },

  render () {
    if (!this.state.loaded) {
      return <div>Loading ...</div>
    }
    if (this.state.error) {
      return <div>Error while fetching regions : {this.state.error.message}</div>
    }
    return (
      <Regions regions={this.state.regions}
          onRegionChange={this.handleNavigateToRegion} />
    );
  }
});
