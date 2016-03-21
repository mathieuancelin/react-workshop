/* eslint react/no-multi-comp: 0, react/jsx-max-props-per-line: 0 */

import React, { PropTypes } from 'react';
import { Comments } from './comments';

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

export const WinePage = React.createClass({

  propTypes: {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    params: PropTypes.shape({
      regionId: PropTypes.string.isRequired,
      wineId: PropTypes.string.isRequired
    }),
    setTitle: PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return {
      wine: undefined,
      liked: false,
      loaded: false,
      error: null
    };
  },

  componentDidMount() {
    fetch(`http://localhost:3000/api/wines/${this.props.params.wineId}`)
      .then(r => r.json())
      .then(data => fetch(`http://localhost:3000/api/wines/${this.props.params.wineId}/like`)
        .then(r => r.json()).then(data2 => [data, data2]))
      .then(data => {
        const [wine, liked] = data;
        this.setState({ wine, liked: liked.like, loaded: true });
        this.props.setTitle(wine.name);
      })
      .catch(error => {
        this.setState({ error, loaded: true });
      });
  },

  handleToggleLike() {
    const old = this.state.liked;
    this.setState({ liked: !old });
    fetch(`http://localhost:3000/api/wines/${this.props.params.wineId}/like`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          like: !old
        })
      })
      .catch(error => {
        this.setState({ error, liked: old });
      });
  },

  render() {
    if (!this.state.loaded) {
      return <div>Loading ...</div>
    }
    if (this.state.error) {
      return <div>Error while fetching wines : {this.state.error.message}</div>
    }
    return (
      <div>
        <Wine wine={this.state.wine} liked={this.state.liked} onToggleLike={this.handleToggleLike} />
        <Comments wineId={this.state.wine.id} />
      </div>
    );
  }
});
