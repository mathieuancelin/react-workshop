import React, { PropTypes } from 'react';

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
  Image: {
    float: 'left'
  }
};

const Wine = React.createClass({

  getInitialState() {
    return {
      wine: undefined,
    };
  },

  componentDidMount() {
    fetch(`http://localhost:3000/api/wines/${this.props.params.wineId}`)
      .then(r => r.json())
      .then(data => {
        this.setState({ wine: data });
      })
      .catch(response => {
        console.error(response); // eslint-disable-line
      });
  },

  render() {
    const { wine } = this.state;
    if (!wine) {
      return <div>Loading ...</div>
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
      </div>
    )
  }
});

export default Wine;
