/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes } from 'react'; // eslint-disable-line

export const Comments = React.createClass({

  updateComments() {
    fetch(`/api/wines/${this.props.wineId}/comments`) // eslint-disable-line
      .then(r => r.json())
      .then(comments => {  // eslint-disable-line

      })
      .catch(error => { // eslint-disable-line

      });
  },

  handlePostComment() {
    fetch(`/api/wines/${this.props.wineId}/comments`, { // eslint-disable-line
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: '...',
          content: '...'
        })
      })
      .then(() => {

      })
      .catch(error => { // eslint-disable-line

      });
  },

  render() {
    return (
      <div>
        <h2>TODO : Comments</h2>
      </div>
    );
  }
});
