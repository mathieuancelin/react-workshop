import React, { PropTypes } from 'react'; // eslint-disable-line

// vous devriez utiliser cette fonction pour le style de chaque région
function computeWineStyle(region, selected) { // eslint-disable-line
  let style = {
    padding: 16
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

const WineList = React.createClass({
  render () {
    return (
      <div>
        <h2>TODO : WineList</h2>
      </div>
    )
  }
})

export default WineList
