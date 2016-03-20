import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const computeRegionStyle = function(region, selected) {
  let style = {
    padding: 16,
    cursor: 'pointer',
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

const Regions = React.createClass({

  getInitialState() {
    return {
      regions: []
    };
  },

  componentDidMount() {
    fetch('http://localhost:3000/api/regions')
      .then(r => r.json())
      .then(data => {
        this.setState({ regions: data });
      })
      .catch(response => {
        console.error(response); // eslint-disable-line
      });
  },

  render () {
    return (
      <div>
        {
          this.state.regions.map(region =>
            <div key={region}
                style={computeRegionStyle(region, this.props.selected)}>
              <Link to={`/regions/${region}`}>{region}</Link>
            </div>
          )
        }
      </div>
    )
  }
})

export default Regions
