import React, { PropTypes } from 'react';

const Styles = {
  Card: {
    padding: 8,
    boxSizing: 'border-box',
    boxShadow: '0 1px 6px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.12)',
    width: '30%'
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
  }
};

const Wine = React.createClass({
  propTypes: {
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
    let wine = this.props.wine;
    return (
      <div style={Styles.Card}>
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
})

export default Wine;
