import 'whatwg-fetch';
import React from 'react';

import Regions from './regions';
import WineList from './wine-list';
import Wine from './wine';

const WineApp = React.createClass({

  render () {
    return (
      <div className="grid">
          <div className="1/2 grid__cell">
            {this.props.children}
          </div>
      </div>
    );
  }
})

export default WineApp
