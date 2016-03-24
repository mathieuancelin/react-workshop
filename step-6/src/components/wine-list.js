/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */
import React, { PropTypes } from 'react';

const computeWineStyle = function(region, selected) {
  let style = {
    padding: 16
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

export const WineList = React.createClass({
  propTypes: {
    onWineChange: PropTypes.func,
    params: PropTypes.shape({
      regionId: PropTypes.string.isRequired
    }),
    wines: PropTypes.arrayOf(PropTypes.object)
  },

  handleWineClick(wine) {
    this.props.onWineChange(wine);
  },

  render () {
    if (this.props.wines.length === 0) {
      return <div>No wine</div>
    }
    return (
      <div>
        {
          this.props.wines.map(wine =>
            <div key={wine.id}
                style={computeWineStyle(wine, null)}
                onClick={this.handleWineClick.bind(this, wine)}>
              {wine.name}
            </div>
          )
        }
      </div>
    )
  }
})

export const WineListPage = React.createClass({
  propTypes: {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    params: PropTypes.shape({
      regionId: PropTypes.string.isRequired
    }),
    setTitle: PropTypes.func
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return {
      wines: [],
      loaded: false,
      error: null
    };
  },

  componentDidMount() {
    fetch(`/api/wines?region=${this.props.params.regionId}`)
      .then(r => r.json())
      .then(data => {
        this.setState({ wines: data, loaded: true });
        this.props.setTitle(`Wines from ${this.props.params.regionId}`);
      })
      .catch(error => {
        this.setState({ error, loaded: true });
      });
  },

  handleNavigateToWine(wine) {
    this.context.router.push({
      pathname: `/regions/${this.props.params.regionId}/wines/${wine.id}`
    });
  },

  render () {
    if (!this.state.loaded) {
      return <div>Loading ...</div>
    }
    if (this.state.error) {
      return <div>Error while fetching wines : {this.state.error.message}</div>
    }
    return (
      <WineList wines={this.state.wines}
          onWineChange={this.handleNavigateToWine} />
    );
  }
});
