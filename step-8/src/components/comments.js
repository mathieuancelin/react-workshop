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

  propTypes: {
    comments: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    wineId: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      commentTitle: '',
      commentBody: ''
    };
  },

  componentDidMount() {
    this.updateComments();
  },

  updateComments() {
    this.props.dispatch(fetchComments(this.props.wineId));
  },

  handleCommentTitleChange(commentTitle) {
    this.setState({ commentTitle });
  },

  handleCommentBodyChange(commentBody) {
    this.setState({ commentBody });
  },

  handlePostComment() {
    const payload = { title: this.state.commentTitle, content: this.state.commentBody };
    this.props.dispatch(postComment(this.props.wineId, payload)).then(() => {
      this.updateComments();
      this.props.dispatch(addComment());
      this.setState({ commentTitle: '', commentBody: '' });
    });
  },

  render() {
    return (
      <View>
        <Text style={styles.commentsTitle}>Comments</Text>
        {
          this.props.comments.map(comment =>
            <View key={comment.date.toString()} style={styles.comment}>
              <Text style={styles.commentTitle}>{comment.title} (le {moment(comment.date).format('DD/MM/YYYY à HH:mm:ss')})</Text>
              <Text>{comment.content}</Text>
            </View>
          )
        }
        <View style={styles.commentForm}>
          <TextInput
              style={styles.inputText}
              onChangeText={this.handleCommentTitleChange}
              placeholder="Titre du commentaire"
              value={this.state.commentTitle} />
          <TextInput
              style={styles.inputText}
              onChangeText={this.handleCommentBodyChange}
              placeholder="Commentaire"
              multiline={true}
              value={this.state.commentBody} />
          <Button
              action={this.handlePostComment}
              style={styles.commentButton}>Commenter</Button>
        </View>
      </View>
    );
  }
}));
