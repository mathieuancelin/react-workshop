import React, { PropTypes } from 'react'; // eslint-disable-line

const WineApp = React.createClass({
  render () {
    return (
      <div className="grid">
        <div className="1/4 grid__cell">
          <h2>Regions</h2>
          ...
        </div>
        <div className="1/3 grid__cell">
          <h2>Wine List</h2>
          ...
        </div>
        <div className="5/12 grid__cell">
          <h2>Wine Description</h2>
          ...
        </div>
      </div>
    )
  }
})

export default WineApp
