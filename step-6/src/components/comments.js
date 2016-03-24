/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions';

export const Comment = React.createClass({
  render() {
    return (
      <span>Comment</span>
    );
  }
});

export const Comments = connect()(React.createClass({

  propTypes: {
    dispatch: PropTypes.func.isRequired,
    wineId: PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      comments: [],
      loaded: false,
      error: null,
      commentTitle: '',
      commentBody: ''
    };
  },

  componentDidMount() {
    this.updateComments();
  },

  updateComments() {
    fetch(`/api/wines/${this.props.wineId}/comments`)
      .then(r => r.json())
      .then(comments => {
        this.setState({ comments: comments.sort((a, b) => new Date(b.date) - new Date(a.date)), loaded: true });
      })
      .catch(error => {
        this.setState({ error, loaded: true });
      });
  },

  handleCommentTitleChange(e) {
    this.setState({ commentTitle: e.target.value });
  },

  handleCommentBodyChange(e) {
    this.setState({ commentBody: e.target.value });
  },

  handlePostComment() {
    fetch(`/api/wines/${this.props.wineId}/comments`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: this.state.commentTitle,
          content: this.state.commentBody
        })
      })
      .then(() => {
        this.updateComments();
        this.props.dispatch(addComment());
        this.setState({ commentTitle: '', commentBody: '' });
      })
      .catch(error => {
        this.setState({ error });
      });
  },

  render() {
    if (!this.state.loaded) {
      return <div>Loading ...</div>
    }
    if (this.state.error) {
      return <div>Error while fetching comments : {this.state.error.message}</div>
    }
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
          this.state.comments.map(comment =>
            <div key={comment.date.toString()} style={{ padding: 10, backgroundColor: '#ececec', marginTop: 5 }}>
              <span>{comment.title} (le <small>{comment.date}</small>)</span>
              <p>{comment.content}</p>
            </div>
          )
        }
      </div>
    );
  }
}));
