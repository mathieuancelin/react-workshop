import React from 'react'

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

const Regions = React.createClass({
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
                onClick={this.handleRegionClick}>
              {region}
            </div>
          )
        }
      </div>
    )
  }
})

export default Regions
