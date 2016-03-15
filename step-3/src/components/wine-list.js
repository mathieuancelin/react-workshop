import React from 'react'

const computeWineStyle = function(region, selected) {
  let style = {
    marginTop: 16,
    marginBottom: 16
  };
  if (region === selected) {
    style['fontWeight'] = 'bold';
    style['backgroundColor'] = 'lightGrey';
  }
  return style;
}

const WineList = React.createClass({
  handleWineClick(event) {
    let wineIndex = event.target.getAttribute('data-wineindex');
    this.props.onWineChange(this.props.wines[wineIndex]);
  },

  render () {
    if (this.props.wines.length === 0) {
      return <div>No wine</div>
    }
    return (
      <div>
        {
          this.props.wines.map((wine, index) =>
            <div key={wine.id}
                data-wineindex={index}
                style={computeWineStyle(wine, this.props.selected)}
                onClick={this.handleWineClick}>
                {wine.name}
            </div>
          )
        }
      </div>
    )
  }
})

export default WineList
