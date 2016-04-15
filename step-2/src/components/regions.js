import React, { PropTypes } from 'react'; // eslint-disable-line

// vous devriez utiliser cette fonction pour le style de chaque région
function computeRegionStyle(region, selected) { // eslint-disable-line
  let style = {
    padding: 16
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

const Regions = React.createClass({
  render () {
    return (
      <div>
        <h2>TODO : Regions</h2>
      </div>
    )
  }
})

export default Regions
