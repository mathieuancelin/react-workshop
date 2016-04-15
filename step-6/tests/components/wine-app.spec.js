/* eslint no-undef:0, no-unused-vars:1, react/jsx-closing-bracket-location: 0, react/jsx-max-props-per-line: 0 */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { createMemoryHistory } from 'react-router';

import { App } from '../../src/app';

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
      const ret = func(data);
      if (ret && ret.then) {
        return ret;
      }
      return promise(ret);
    },
    catch() {}
  };
}

const likes = {
  'clarendelle':  false,
  'les-hauts-de-tour-prignac': false,
  'chevrol-bel-air': false,
  'bel-air': false
};

const comments = {
  'clarendelle':  [],
  'les-hauts-de-tour-prignac': [],
  'chevrol-bel-air': [],
  'bel-air': []
};

window.fetch = (url, post) => {
  if (url.startsWith('/api/likes')) {
    return promise({ json: () => ({ count: Object.keys(likes).filter(k => likes[k]).length }) });
  }
  if (url.startsWith('/api/comments')) {
    return promise({ json: () => ({ count: Object.keys(comments).map(k => comments[k].length).reduce((a, b) => a + b) }) });
  }
  if (url.startsWith('/api/regions')) {
    return promise({ json: () => regions });
  }
  if (url.startsWith(`/api/wines?region=${regions[0]}`)) {
    return promise({ json: () => wines1 });
  }
  if (url.startsWith(`/api/wines?region=${regions[1]}`)) {
    return promise({ json: () => wines2 });
  }
  // POST sur like
  if (url.startsWith(`/api/wines/${wines1[0].id}/like`) && post) {
    likes[wines1[0].id] = !likes[wines1[0].id];
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines1[1].id}/like`) && post) {
    likes[wines1[1].id] = !likes[wines1[1].id];
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines2[0].id}/like`) && post) {
    likes[wines2[0].id] = !likes[wines2[0].id];
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines2[1].id}/like`) && post) {
    likes[wines2[1].id] = !likes[wines2[1].id];
    return promise({ json: () => [] });
  }
  // GET sur like
  if (url.startsWith(`/api/wines/${wines1[0].id}/like`)) {
    return promise({ json: () => ({ like: likes[wines1[0].id] }) });
  }
  if (url.startsWith(`/api/wines/${wines1[1].id}/like`)) {
    return promise({ json: () => ({ like: likes[wines1[1].id] }) });
  }
  if (url.startsWith(`/api/wines/${wines2[0].id}/like`)) {
    return promise({ json: () => ({ like: likes[wines2[0].id] }) });
  }
  if (url.startsWith(`/api/wines/${wines2[1].id}/like`)) {
    return promise({ json: () => ({ like: likes[wines2[1].id] }) });
  }

  // POST sur comments
  if (url.startsWith(`/api/wines/${wines1[0].id}/comments`) && post) {
    comments[wines1[0].id].push(Object.assign({}, JSON.parse(post.body), { date: 'today' } ));
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines1[1].id}/comments`) && post) {
    comments[wines1[1].id].push(Object.assign({}, JSON.parse(post.body), { date: 'today' } ));
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines2[0].id}/comments`) && post) {
    comments[wines2[0].id].push(Object.assign({}, JSON.parse(post.body), { date: 'today' } ));
    return promise({ json: () => [] });
  }
  if (url.startsWith(`/api/wines/${wines2[1].id}/comments`) && post) {
    comments[wines2[1].id].push(Object.assign({}, JSON.parse(post.body), { date: 'today' } ));
    return promise({ json: () => [] });
  }
  // GET sur comments
  if (url.startsWith(`/api/wines/${wines1[0].id}/comments`)) {
    return promise({ json: () => comments[wines1[0].id] });
  }
  if (url.startsWith(`/api/wines/${wines1[1].id}/comments`)) {
    return promise({ json: () => comments[wines1[1].id] });
  }
  if (url.startsWith(`/api/wines/${wines2[0].id}/comments`)) {
    return promise({ json: () => comments[wines2[0].id] });
  }
  if (url.startsWith(`/api/wines/${wines2[1].id}/comments`)) {
    return promise({ json: () => comments[wines2[1].id] });
  }

  // GET sur un wine
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

describe('<App />', () => {
  it('doit afficher des régions', (done) => {
    setTimeout(() => {
      const history = createMemoryHistory(window.location);
      const wrapper = mount(
        <App history={history} />
      );
      const foundRegions = wrapper.find('Regions').find('div').filterWhere(n => regions.indexOf(n.get(0).innerHTML) > -1);
      expect(foundRegions.length).to.equal(2);
      done();
    });
  });

  it('doit afficher des vins après avoir sélectionné une région', (done) => {
    setTimeout(() => {
      const history = createMemoryHistory(window.location);
      const wrapper = mount(
        <App history={history} />
      );

      {
        const foundRegions = wrapper.find('Regions').find('div').filterWhere(n => regions.indexOf(n.get(0).innerHTML) > -1);
        expect(foundRegions.length).to.equal(2);
      }

      const region2 = wrapper.find('Regions').find('div').filterWhere(n => n.get(0).innerHTML === regions[1]);
      region2.simulate('click');

      {
        const wineNames1 = Object.keys(wines1).map(k => wines1[k].name);
        const foundWines1 = wrapper.find('WineList').find('div').filterWhere(n => wineNames1.indexOf(n.get(0).innerHTML) > -1);
        expect(foundWines1.length).to.equal(0);

        const wineNames2 = Object.keys(wines2).map(k => wines2[k].name);
        const foundWines2 = wrapper.find('WineList').find('div').filterWhere(n => wineNames2.indexOf(n.get(0).innerHTML) > -1);
        expect(foundWines2.length).to.equal(2);
      }

      history.goBack();

      const region1 = wrapper.find('Regions').find('div').filterWhere(n => n.get(0).innerHTML === regions[0]);
      region1.simulate('click');

      {
        const wineNames1 = Object.keys(wines1).map(k => wines1[k].name);
        const foundWines1 = wrapper.find('WineList').find('div').filterWhere(n => wineNames1.indexOf(n.get(0).innerHTML) > -1);
        expect(foundWines1.length).to.equal(2);

        const wineNames2 = Object.keys(wines2).map(k => wines2[k].name);
        const foundWines2 = wrapper.find('WineList').find('div').filterWhere(n => wineNames2.indexOf(n.get(0).innerHTML) > -1);
        expect(foundWines2.length).to.equal(0);
      }
      history.goBack();
      history.goBack();
      done();
    });
  });

  it('doit afficher un vin après avoir sélectionné un nouveau vin', (done) => {
    setTimeout(() => {
      const history = createMemoryHistory(window.location);
      const wrapper = mount(
        <App history={history} />
      );

      const region1 = wrapper.find('Regions').find('div').filterWhere(n => n.get(0).innerHTML === regions[0]);
      region1.simulate('click');

      const wine1 = wrapper.find('WineList').find('div').filterWhere(n => n.get(0).innerHTML === wines1[0].name);
      wine1.simulate('click');

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

      history.goBack();

      const wine2 = wrapper.find('WineList').find('div').filterWhere(n => n.get(0).innerHTML === wines1[1].name);
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
      history.goBack();
      history.goBack();
      done();
    });
  });

  it('doit afficher un vin et le liker tout en incrémentant les stats globales', () => {
    const history = createMemoryHistory(window.location);
    const wrapper = mount(
      <App history={history} />
    );

    const region1 = wrapper.find('Regions').find('div').filterWhere(n => n.get(0).innerHTML === regions[0]);
    region1.simulate('click');

    const wine1 = wrapper.find('WineList').find('div').filterWhere(n => n.get(0).innerHTML === wines1[0].name);
    wine1.simulate('click');

    const like = wrapper.find('Wine').find('span').filterWhere(n => n.get(0).innerHTML === 'like');
    expect(like.length).to.equal(1);

    expect(wrapper.find('Stats').contains(<div><span>likes : </span><span>0</span></div>));

    like.simulate('click');

    const like2 = wrapper.find('Wine').find('span').filterWhere(n => n.get(0).innerHTML === 'unlike');
    expect(like2.length).to.equal(1);

    expect(wrapper.find('Stats').contains(<div><span>likes : </span><span>1</span></div>));

    like2.simulate('click');

    const like3 = wrapper.find('Wine').find('span').filterWhere(n => n.get(0).innerHTML === 'like');
    expect(like3.length).to.equal(1);
    expect(wrapper.find('Stats').contains(<div><span>likes : </span><span>0</span></div>));
  });

  it('doit afficher un vin et poster un commentaire tout en incrémentant les stats globales', () => {
    const history = createMemoryHistory(window.location);
    const wrapper = mount(
      <App history={history} />
    );

    const region1 = wrapper.find('Regions').find('div').filterWhere(n => n.get(0).innerHTML === regions[0]);
    region1.simulate('click');

    const wine1 = wrapper.find('WineList').find('div').filterWhere(n => n.get(0).innerHTML === wines1[0].name);
    wine1.simulate('click');

    // find comemnts

    let paragraphs = wrapper.find('Comments').find('p');
    expect(paragraphs.length).to.equals(0);

    expect(wrapper.find('Stats').contains(<div><span>comments : </span><span>0</span></div>));

    wrapper.find('Comments').find('input').simulate('change', { target: { value: 'Comment 1' } });
    wrapper.find('Comments').find('textarea').simulate('change', { target: { value: 'Comment 1 body' } });
    wrapper.find('Comments').find('button').simulate('click');

    paragraphs = wrapper.find('Comments').find('p');
    expect(paragraphs.length).to.equals(1);
    expect(paragraphs.at(0).html()).to.equals('<p>Comment 1 body</p>');
    expect(wrapper.find('Stats').contains(<div><span>comments : </span><span>1</span></div>));
  });
});
