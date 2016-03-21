import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export const Global = React.createClass({
  propTypes: {
    comments: PropTypes.number.isRequired,
    likes: PropTypes.number.isRequired
  },

  render() {
    return (
      <div className="1/2 grid__cell">
        <h2>Global stats</h2>
        <div>comments : {this.props.comments}</div>
        <div>likes : {this.props.likes}</div>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    likes: state.likes
  };
};

export const GlobalBar = connect(mapStateToProps)(Global);
