/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes } from 'react';
import { Comments } from './comments';

import { connect } from 'react-redux';
import { fetchWine, fetchWineLiked, setTitle, toggleWineLiked } from '../actions';

const Styles = {
  Card: {
    padding: 8,
    boxSizing: 'border-box',
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
    minHeight: 280
  },
  Title: {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  Info: {
    marginTop: 16,
    marginBottom: 16
  },
  Label: {
    color: 'white',
    marginRight: 8,
    padding: 4,
    background: 'grey',
    borderRadius: '4px'
  },
  Like: {
    cursor: 'pointer',
    color: 'white',
    marginRight: 8,
    padding: 4,
    background: 'lightblue',
    borderRadius: '4px'
  },
  Liked: {
    cursor: 'pointer',
    color: 'black',
    marginRight: 8,
    padding: 4,
    background: 'yellow',
    borderRadius: '4px'
  },
  Image: {
    float: 'left'
  }
};

export const Wine = React.createClass({
  propTypes: {
    liked: PropTypes.bool.isRequired,
    onToggleLike: PropTypes.func.isRequired,
    wine: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.oneOf(['Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Moelleux']),
      appellation: PropTypes.shape({
        name: PropTypes.string,
        region: PropTypes.string
      }),
      grapes: PropTypes.arrayOf(PropTypes.string)
    })
  },

  render() {
    const { wine, liked } = this.props;
    if (!wine) {
      return <div>No information</div>
    }
    return (
      <div style={Styles.Card}>
          <img style={Styles.Image}
              src={`http://localhost:3000/api/wines/${wine.id}/image`}
          />
          <div style={Styles.Title}>{wine.name}</div>
          <div style={Styles.Info}>
            <span style={Styles.Label}>Type</span>{wine.type}
          </div>
          <div style={Styles.Info}>
            <span style={Styles.Label}>Région</span>{wine.appellation.region}
          </div>
          <div style={Styles.Info}>
            <span style={Styles.Label}>Appellation</span>{wine.appellation.name}
          </div>
          <div style={Styles.Info}>
            <span style={Styles.Label}>Cépages</span>{wine.grapes.join(', ')}
          </div>
          <div style={Object.assign({}, Styles.Info, { marginTop: 40 })}>
            <span onClick={this.props.onToggleLike} style={liked ? Styles.Liked : Styles.Like}>{liked ? 'unlike' : 'like'}</span>
          </div>
      </div>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    wine: state.currentWine.wine,
    liked: state.currentWine.liked,
    httpState: state.http.state
  };
}

export const WinePage = connect(mapStateToProps)(React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    httpState: PropTypes.string,
    liked: PropTypes.bool,
    params: PropTypes.shape({
      regionId: PropTypes.string.isRequired,
      wineId: PropTypes.string.isRequired
    }),
    setTitle: PropTypes.func,
    wine: PropTypes.object
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount() {
    this.props.dispatch(fetchWine(this.props.params.wineId)).then(() => {
      this.props.dispatch(setTitle(this.props.wine.name));
      this.props.dispatch(fetchWineLiked(this.props.params.wineId));
    });
  },

  handleToggleLike() {
    this.props.dispatch(toggleWineLiked(this.props.params.wineId));
  },

  render() {
    if (this.props.httpState === 'LOADED') {
      const comments = this.props.wine ? <Comments wineId={this.props.wine.id} /> : null;
      return (
        <div>
          <Wine wine={this.props.wine} liked={this.props.liked} onToggleLike={this.handleToggleLike} />
          {comments}
        </div>
      );
    }
    return null;
  }
}));
