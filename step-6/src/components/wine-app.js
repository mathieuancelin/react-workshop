import React, { PropTypes } from 'react';
import { GlobalStats } from './stats';

const WineApp = React.createClass({

  propTypes: {
    children: PropTypes.element
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  getInitialState() {
    return {
      title: ''
    };
  },

  setTitle(title) {
    this.setState({ title });
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
                  {this.state.title}
                  <button
                      type="button"
                      onClick={this.handleGoBack}>back</button>
              </h2>
              {this.props.children && React.cloneElement(this.props.children, {
                setTitle: this.setTitle
              })}
            </div>
            <div className="1/2 grid__cell">
              <GlobalStats />
            </div>
        </div>
      </div>
    );
  }
})

export default WineApp
