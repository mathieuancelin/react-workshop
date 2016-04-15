/* eslint no-undef:0, no-unused-vars:1, react/jsx-closing-bracket-location: 0, react/jsx-max-props-per-line: 0 */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import WineApp from '../../src/components/wine-app';

const regions = ['Bordeaux', 'Bourgogne'];

const wines1 = [
  {
    "id": "chevrol-bel-air",
    "name": "Château Chevrol Bel Air",
    "type": "Rouge",
    "appellation": {"name": "Lalande-de-Pomerol", "region": "Bordeaux"},
    "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
  },
  {
    "id": "bel-air",
    "name": "Château Bel-Air",
    "type": "Rouge",
    "appellation": {"name": "Lussac-Saint-Emilion", "region": "Bordeaux"},
    "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
  }
];

const wines2 = [
  {
    "id": "clarendelle",
    "name": "Clarendelle",
    "type": "Blanc",
    "appellation": {"name": "Bordeaux", "region": "Bordeaux"},
    "grapes": ["Sauvignon", "Sémillon", "Muscadelle"]
  },
  {
    "id": "les-hauts-de-tour-prignac",
    "name": "Les Hauts de Tour Prignac",
    "type": "Rouge",
    "appellation": {"name": "Médoc", "region": "Bordeaux"},
    "grapes": ["Cabernet Sauvignon", "Merlot"]
  }
];

function promise(data) {
  return {
    then(func) {
      return promise(func(data));
    },
    catch() {}
  };
}

window.fetch = (url) => {
  if (url.startsWith('/api/regions')) {
    return promise({ json: () => regions });
  }
  if (url.startsWith(`/api/wines?region=${regions[0]}`)) {
    return promise({ json: () => wines1 });
  }
  if (url.startsWith(`/api/wines?region=${regions[1]}`)) {
    return promise({ json: () => wines2 });
  }
  if (url.startsWith(`/api/wines/${wines1[0].id}`)) {
    return promise({ json: () => wines1[0] });
  }
  if (url.startsWith(`/api/wines/${wines1[1].id}`)) {
    return promise({ json: () => wines1[1] });
  }
  if (url.startsWith(`/api/wines/${wines2[0].id}`)) {
    return promise({ json: () => wines2[0] });
  }
  if (url.startsWith(`/api/wines/${wines2[1].id}`)) {
    return promise({ json: () => wines2[1] });
  }
  throw new Error(`Unknown URL : ${url}`);
};
global.fetch = window.fetch;

describe('<WineApp />', () => {
  it('doit afficher des régions', () => {
    const wrapper = mount(
      <WineApp />
    );

    const foundRegions = wrapper.find('div').filterWhere(n => regions.indexOf(n.get(0).innerHTML) > -1);
    expect(foundRegions.length).to.equal(2);
  });
  it('doit afficher la liste des vins de la région', () => {
    const wrapper = mount(
      <WineApp />
    );

    const wineNames1 = Object.keys(wines1).map(k => wines1[k].name);
    const foundWines1 = wrapper.find('div').filterWhere(n => wineNames1.indexOf(n.get(0).innerHTML) > -1);
    expect(foundWines1.length).to.equal(3); // 3 because the first wine is showed

    const wineNames2 = Object.keys(wines2).map(k => wines2[k].name);
    const foundWines2 = wrapper.find('div').filterWhere(n => wineNames2.indexOf(n.get(0).innerHTML) > -1);
    expect(foundWines2.length).to.equal(0);
  });
  it('doit afficher le premier vin de la région', () => {
    const wrapper = mount(
      <WineApp />
    );

    const firstWine = wines1[0];
    const Wine = wrapper.find('Wine').at(0).first();
    const foundName = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.name) > -1);
    const foundType = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.type) > -1);
    const foundRegion = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.region) > -1);
    const foundAppellation = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.name) > -1);
    const foundGrapes = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.grapes.join(', ')) > -1);

    expect(foundName.length).to.equal(2); // because of root div
    expect(foundType.length).to.equal(2);
    expect(foundAppellation.length).to.equal(2);
    expect(foundRegion.length).to.equal(2);
    expect(foundGrapes.length).to.equal(2);
  });
  it('doit afficher des vins après avoir sélectionné une région', () => {
    const wrapper = mount(
      <WineApp />
    );

    {
      const wineNames1 = Object.keys(wines1).map(k => wines1[k].name);
      const foundWines1 = wrapper.find('div').filterWhere(n => wineNames1.indexOf(n.get(0).innerHTML) > -1);
      expect(foundWines1.length).to.equal(3); // 3 because the first wine is showed

      const wineNames2 = Object.keys(wines2).map(k => wines2[k].name);
      const foundWines2 = wrapper.find('div').filterWhere(n => wineNames2.indexOf(n.get(0).innerHTML) > -1);
      expect(foundWines2.length).to.equal(0);
    }

    const region2 = wrapper.find('div').filterWhere(n => n.get(0).innerHTML === regions[1]);
    region2.simulate('click');

    {
      const wineNames1 = Object.keys(wines1).map(k => wines1[k].name);
      const foundWines1 = wrapper.find('div').filterWhere(n => wineNames1.indexOf(n.get(0).innerHTML) > -1);
      expect(foundWines1.length).to.equal(0);

      const wineNames2 = Object.keys(wines2).map(k => wines2[k].name);
      const foundWines2 = wrapper.find('div').filterWhere(n => wineNames2.indexOf(n.get(0).innerHTML) > -1);
      expect(foundWines2.length).to.equal(3); // 3 because the first wine is showed
    }
  });
  it('doit afficher le premier vin de la région après avoir sélectionné une région', () => {
    const wrapper = mount(
      <WineApp />
    );

    {
      const firstWine = wines1[0];
      const Wine = wrapper.find('Wine').at(0).first();
      const foundName = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.name) > -1);
      const foundType = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.type) > -1);
      const foundRegion = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.region) > -1);
      const foundAppellation = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.name) > -1);
      const foundGrapes = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.grapes.join(', ')) > -1);

      expect(foundName.length).to.equal(2); // because of root div
      expect(foundType.length).to.equal(2);
      expect(foundAppellation.length).to.equal(2);
      expect(foundRegion.length).to.equal(2);
      expect(foundGrapes.length).to.equal(2);
    }

    const region2 = wrapper.find('div').filterWhere(n => n.get(0).innerHTML === regions[1]);
    region2.simulate('click');

    {
      const firstWine = wines2[0];
      const Wine = wrapper.find('Wine').at(0).first();
      const foundName = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.name) > -1);
      const foundType = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.type) > -1);
      const foundRegion = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.region) > -1);
      const foundAppellation = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.name) > -1);
      const foundGrapes = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.grapes.join(', ')) > -1);

      expect(foundName.length).to.equal(2); // because of root div
      expect(foundType.length).to.equal(2);
      expect(foundAppellation.length).to.equal(3);
      expect(foundRegion.length).to.equal(3);
      expect(foundGrapes.length).to.equal(2);
    }
  });
  it('doit afficher un vin après avoir sélectionné un nouveau vin', () => {
    const wrapper = mount(
      <WineApp />
    );

    {
      const firstWine = wines1[0];
      const Wine = wrapper.find('Wine').at(0).first();
      const foundName = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.name) > -1);
      const foundType = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.type) > -1);
      const foundRegion = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.region) > -1);
      const foundAppellation = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.name) > -1);
      const foundGrapes = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.grapes.join(', ')) > -1);

      expect(foundName.length).to.equal(2); // because of root div
      expect(foundType.length).to.equal(2);
      expect(foundAppellation.length).to.equal(2);
      expect(foundRegion.length).to.equal(2);
      expect(foundGrapes.length).to.equal(2);
    }

    const wine2 = wrapper.find('div').filterWhere(n => n.get(0).innerHTML === wines1[1].name);
    wine2.simulate('click');

    {
      const firstWine = wines1[1];
      const Wine = wrapper.find('Wine').at(0).first();
      const foundName = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.name) > -1);
      const foundType = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.type) > -1);
      const foundRegion = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.region) > -1);
      const foundAppellation = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.appellation.name) > -1);
      const foundGrapes = Wine.find('div').filterWhere(n => n.get(0).innerHTML.indexOf(firstWine.grapes.join(', ')) > -1);

      expect(foundName.length).to.equal(2); // because of root div
      expect(foundType.length).to.equal(2);
      expect(foundAppellation.length).to.equal(2);
      expect(foundRegion.length).to.equal(2);
      expect(foundGrapes.length).to.equal(2);
    }
  });
});
