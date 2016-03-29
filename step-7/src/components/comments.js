/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment, fetchComments, postComment } from '../actions';

export const Comment = React.createClass({
  render() {
    return (
      <span>Comment</span>
    );
  }
});

const mapStateToProps = state => ({ comments: state.currentWine.comments, httpState: state.http.state });

export const Comments = connect(mapStateToProps)(React.createClass({

  propTypes: {
    comments: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    httpState: PropTypes.string,
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

  handleCommentTitleChange(e) {
    this.setState({ commentTitle: e.target.value });
  },

  handleCommentBodyChange(e) {
    this.setState({ commentBody: e.target.value });
  },

  handlePostComment() {
    this.props.dispatch(postComment(this.props.wineId, {
      title: this.state.commentTitle,
      content: this.state.commentBody
    })).then(() => {
      this.updateComments();
      this.props.dispatch(addComment());
      this.setState({ commentTitle: '', commentBody: '' });
    });
  },

  render() {
    if (!this.props.httpState === 'LOADED') {
      return (
        <div>
          <h3>Comments</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginBottom: 10 }}>
              <input
                  onChange={this.handleCommentTitleChange}
                  style={{ flexGrow: 8 }}
                  type="text"
                  placeholder="Comment title"
                  value={this.state.commentTitle} />
              <button
                  onClick={this.handlePostComment}
                  style={{ flexGrow: 2, marginLeft: 10 }}
                  type="button">Comment</button>
            </div>
            <textarea onChange={this.handleCommentBodyChange} placeholder="Comment" rows="5" value={this.state.commentBody}></textarea>
          </div>
          {
            this.props.comments.map(comment =>
              <div key={comment.date.toString()} style={{ padding: 10, backgroundColor: '#ececec', marginTop: 5 }}>
                <span>{comment.title} (le <small>{comment.date}</small>)</span>
                <p>{comment.content}</p>
              </div>
            )
          }
        </div>
      );
    }
  }
}));
