import React from 'react';
import ReactDOM from 'react-dom';

import Wine from './components/wine';

const ChevrolBelAir = {
  "id": "chevrol-bel-air",
  "name": "Château Chevrol Bel Air",
  "type": "Rouge",
  "appellation": {
    "name": "Lalande-de-Pomerol",
    "region": "Bordeaux"
  },
  "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
};

ReactDOM.render(
    <Wine wine={ChevrolBelAir}/>,
    document.getElementById('main')
);
