/* eslint react/jsx-no-bind: 0, react/no-multi-comp: 0, react/jsx-closing-bracket-location: 0 */
import React, { PropTypes } from 'react';
import { fetchWinesForRegion } from '../actions';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
  return {
    wines: state.wines,
    httpState: state.http.state
  };
}

export const WineListPage = connect(mapStateToProps)(React.createClass({
  propTypes: {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }),
    httpState: PropTypes.string,
    params: PropTypes.shape({
      regionId: PropTypes.string.isRequired
    }),
    setTitle: PropTypes.func.isRequired,
    wines: PropTypes.object.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  componentDidMount() {
    this.props.dispatch(fetchWinesForRegion(this.props.params.regionId));
    this.props.setTitle(`Wines from ${this.props.params.regionId}`);
  },

  handleNavigateToWine(wine) {
    this.context.router.push({
      pathname: `/regions/${this.props.params.regionId}/wines/${wine.id}`
    });
  },

  render () {
    if (this.props.httpState === 'LOADED') {
      const wines = this.props.wines[this.props.params.regionId] || { data: [] };
      return (
        <WineList wines={wines.data} onWineChange={this.handleNavigateToWine} />
      );
    }
    return null;
  }
}));
