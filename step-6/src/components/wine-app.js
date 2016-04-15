/* eslint react/no-multi-comp: 0 */
import React, { PropTypes } from 'react';
import { GlobalStats } from './stats';
import { connect } from 'react-redux';
import { DevTools } from './devtools';

const NoDevToolsCauseInTestEnv = React.createClass({
  render() {
    return null;
  }
});

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
    const Tools = window.TEST ? NoDevToolsCauseInTestEnv : DevTools;
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
        <Tools />
      </div>
    );
  }
}));
