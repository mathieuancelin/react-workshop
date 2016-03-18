import React from 'react';

const WineStyle = {
  padding: 8,
  boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)'
};

const Wine = React.createClass({
  propTypes: {
    name: React.PropTypes.string
  },

  render() {
    return (
      <div style={WineStyle}>
          {this.props.name}
      </div>
    );
  }
});

export default Wine;
