/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes, View, Text, TextInput } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { addComment, fetchComments, postComment } from '../actions';
import { styles } from './style';
import { Button } from './button';

const mapStateToProps = (state) => {
  return {
    comments: state.currentWine.comments
  };
}

export const Comments = connect(mapStateToProps)(React.createClass({
  getInitialState() {
    return {
      commentTitle: '',
      commentBody: ''
    };
  },

  handlePostComment() {
    const payload = { title: this.state.commentTitle, content: this.state.commentBody };
    this.props.dispatch(postComment(this.props.wineId, payload)).then(() => {
      this.setState({ commentTitle: '', commentBody: '' });
    });
  },

  render() {
    return (
      <Text>comments</Text>
    );
  }
}));
