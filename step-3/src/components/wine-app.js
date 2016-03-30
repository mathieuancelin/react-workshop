import React from 'react';

const WineApp = React.createClass({
  render () {
    return (
      <div className="grid">
          <div className="1/2 grid__cell">
            {this.props.children}
          </div>
      </div>
    );
  }
})

export default WineApp
