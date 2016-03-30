/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const computeWineStyle = function(region, selected) {
  let style = {
    padding: 16
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

export const WineList = React.createClass({
  propTypes: {
    onWineChange: PropTypes.func,
    selected: PropTypes.object,
    wines: PropTypes.arrayOf(PropTypes.object)
  },

  handleWineClick(event) {
    let wineIndex = event.target.getAttribute('data-wineindex');
    this.props.onWineChange(this.props.wines[wineIndex]);
  },

  render () {
    if (this.props.wines.length === 0) {
      return <div>No wine</div>
    }
    return (
      <div>
        {
          this.props.wines.map((wine, index) =>
            <div key={wine.id}
                data-wineindex={index}
                style={computeWineStyle(wine, this.props.selected)}
                onClick={this.handleWineClick}
            >
                {wine.name}
            </div>
          )
        }
      </div>
    )
  }
})

export const WineListPage = React.createClass({
  render () {
    return (
      <div>
        <h2>TODO : WineListPage</h2>
        <Link to="/regions/foo/wines/bar">Goto WinePage</Link>
      </div>
    );
  }
});
