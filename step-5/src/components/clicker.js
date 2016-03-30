import { increment } from '../actions';
import { connect } from 'react-redux';
import React, { PropTypes } from 'react';

const SimpleClicker = React.createClass({
  propTypes: {
    counter: PropTypes.number,
    dispatch: PropTypes.func
  },
  handleButtonClick() {
    this.props.dispatch(increment());
  },
  render() {
    return (
      <div>
        <span>Clicked : {this.props.counter}  </span>
        <button type="button" onClick={this.handleButtonClick}>+1</button>
      </div>
    );
  }
});

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
};

export const Clicker = connect(mapStateToProps)(SimpleClicker);
