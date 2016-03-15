import React from 'react';
import Axios from 'axios';

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
    Axios.get('http://localhost:3000/api/regions')
      .then(response => {
        this.setState({
          regions: response.data,
          selectedRegion: response.data[0]
        });
        this.loadWinesByRegion(response.data[0]);
      })
      .catch(response => {
        console.log(response);
      });
  },

  loadWinesByRegion(region) {
    Axios.get(`http://localhost:3000/api/wines?region=${region}`)
      .then(response => {
        this.setState({
          wines: response.data,
          selectedWine: response.data[0]
        });
      })
      .catch(response => {
        console.log(response);
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
