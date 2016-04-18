/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes, Image, View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { fetchWine, fetchWineLiked, setTitle, toggleWineLiked } from '../actions';
import { styles } from './style';
import { Comments } from './comments';
import { apiHost } from '../actions';

const mapStateToProps = (state) => {
  return {
    currentWine: state.currentWine.wine,
    liked: state.currentWine.liked
  };
}

export const Wine = connect(mapStateToProps)(React.createClass({
  componentDidMount() {
    this.props.dispatch(fetchWine(this.props.wine.id)).then(() => {
      this.props.dispatch(fetchWineLiked(this.props.wine.id));
    });
  },

  handleToggleLike() {
    this.props.dispatch(toggleWineLiked(this.props.wine.id));
  },

  render() {
    const { wine, liked } = this.props;
    return (
      <Text>Wine</Text>
    );
  }
}));
