import React, { PropTypes } from 'react';
import { GlobalStats } from './stats';
import { setTitle } from '../actions';
import { connect } from 'react-redux';
import { DevTools } from './devtools';

const mapStateToProps = (state) => {
  return {
    title: state.title,
    httpState: state.http.state,
    httpError: state.http.error
  };
}

export const WineApp = connect(mapStateToProps)(React.createClass({
  propTypes: {
    children: PropTypes.element,
    dispatch: PropTypes.func.isRequired,
    httpError: PropTypes.string,
    httpState: PropTypes.string,
    title: PropTypes.string.isRequired
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  setTitle(title) {
    this.props.dispatch(setTitle(title));
  },

  handleGoBack() {
    this.context.router.goBack();
  },

  render () {
    const message = this.props.httpState === 'LOADING' ?
      'Loading ...' :
      (this.props.httpState === 'LOADED' ?
        '' :
        `ERROR : ${this.props.httpError}`);
    return (
      <div>
        <div className="grid">
            <div className="1/2 grid__cell" style={{
              height: 20,
              backgroundColor: this.props.httpState === 'ERROR' ? 'red' : null,
              color: this.props.httpState === 'ERROR' ? 'white' : 'black'  
            }}>
                <div>{message}</div>
            </div>
        </div>
        <div className="grid">
            <div className="1/2 grid__cell">
              <h2>
                  {this.props.title}
                  <button type="button" onClick={this.handleGoBack}>back</button>
              </h2>
              {this.props.children && React.cloneElement(this.props.children, {
                setTitle: this.setTitle
              })}
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
