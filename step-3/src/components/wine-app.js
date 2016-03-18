import 'whatwg-fetch';
import React from 'react';

import Regions from './regions';
import WineList from './wine-list';
import Wine from './wine';

const WineApp = React.createClass({

  getInitialState() {
    return {
      regions: [],
      selectedRegion: null,
      wines:[],
      selectedWine: null
    };
  },

  componentDidMount() {
    fetch('http://localhost:3000/api/regions')
      .then(r => r.json())
      .then(data => {
        this.setState({
          regions: data,
          selectedRegion: data[0]
        });
        this.loadWinesByRegion(data[0]);
      })
      .catch(response => {
        console.error(response); // eslint-disable-line
      });
  },

  loadWinesByRegion(region) {
    fetch(`http://localhost:3000/api/wines?region=${region}`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          wines: data,
          selectedWine: data[0]
        });
      })
      .catch(response => {
        console.error(response); // eslint-disable-line
      });
  },

  handleRegionChange(region) {
    this.setState({
      selectedRegion: region
    });
    this.loadWinesByRegion(region);
  },

  handleWineChange(wine) {
    this.setState({
      selectedWine: wine
    });
  },

  render () {
    return (
      <div className="grid">
          <div className="1/4 grid__cell">
            <h2>Regions</h2>
            <Regions regions={this.state.regions}
                selected={this.state.selectedRegion}
                onRegionChange={this.handleRegionChange}
            />
          </div>
          <div className="1/3 grid__cell">
            <h2>Wine List</h2>
            <WineList wines={this.state.wines}
                selected={this.state.selectedWine}
                onWineChange={this.handleWineChange}
            />
          </div>
          <div className="5/12 grid__cell">
            <h2>Wine Description</h2>
            <Wine wine={this.state.selectedWine} />
          </div>
      </div>
    )
  }
})

export default WineApp
