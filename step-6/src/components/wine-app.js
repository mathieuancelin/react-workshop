import React, { PropTypes } from 'react';
import { GlobalStats } from './stats';
import { connect } from 'react-redux';
import { DevTools } from './devtools';

export const WineApp = connect()(React.createClass({
  propTypes: {
    children: PropTypes.element
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  handleGoBack() {
    this.context.router.goBack();
  },

  render () {
    return (
      <div>
        <div className="grid">
            <div className="1/2 grid__cell">
              <h2>
                  {this.props.title}
                  <button type="button" onClick={this.handleGoBack}>back</button>
              </h2>
              {this.props.children}
            </div>
            <div className="1/2 grid__cell">
              <GlobalStats />
            </div>
        </div>
        <DevTools />
      </div>
    );
  }
}));
