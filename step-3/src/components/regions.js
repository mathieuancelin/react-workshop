/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const computeRegionStyle = function(region, selected) {
  let style = {
    padding: 16
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
    regions: PropTypes.arrayOf(PropTypes.string),
    selected: PropTypes.string
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
                style={computeRegionStyle(region, this.props.selected)}
                onClick={this.handleRegionClick}
            >
              {region}
            </div>
          )
        }
      </div>
    )
  }
})

export const RegionsPage = React.createClass({
  render () {
    return (
      <div>
        <h2>TODO : RegionsPage</h2>
        <Link to="/regions/foo">Goto WineListPage</Link>
      </div>
    );
  }
})
