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

const WineList = React.createClass({

  getInitialState() {
    return {
      wines: []
    };
  },

  componentDidMount() {
    fetch(`http://localhost:3000/api/wines?region=${this.props.params.regionId}`)
      .then(r => r.json())
      .then(data => {
        this.setState({ wines: data });
      })
      .catch(response => {
        console.error(response); // eslint-disable-line
      });
  },

  render () {
    if (this.state.wines.length === 0) {
      return <div>Loading ...</div>
    }
    return (
      <div>
        {
          this.state.wines.map((wine, index) =>
            <div key={wine.id} style={computeWineStyle(wine, this.props.selected)}>
                <Link to={`/regions/${this.props.params.regionId}/wines/${wine.id}`}>{wine.name}</Link>
            </div>
          )
        }
      </div>
    )
  }
})

export default WineList
