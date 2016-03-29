import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    comments: state.comments.count,
    likes: state.likes.count
  };
}

export const GlobalStats = connect(mapStateToProps)(React.createClass({
  propTypes: {
    comments: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired
  },

  render() {
    return (
      <div>
        <h2>Global stats</h2>
        <div>comments : {this.props.comments}</div>
        <div>likes : {this.props.likes}</div>
      </div>
    );
  }
}))
