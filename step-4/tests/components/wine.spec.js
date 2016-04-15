/* eslint no-undef:0, no-unused-vars:0, react/jsx-closing-bracket-location: 0, react/jsx-max-props-per-line: 0 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Wine } from '../../src/components/wine';

const blackHorse = {
  "id": "cheval-noir",
  "name": "Cheval Noir",
  "type": "Rouge",
  "appellation": {"name": "Saint-Emilion", "region": "Bordeaux"},
  "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
};

function nothing() {}

describe('<Wine />', () => {
  it('doit afficher un bon vin, dans une boooonne aubèèèrge', () => {
    const wrapper = shallow(
      <Wine wine={blackHorse} liked={false} onToggleLike={nothing} />
    );
    const spans = wrapper.find('span');
    const divs = wrapper.find('div');
    const img = wrapper.find('img').get(0);
    expect(wrapper.equals(
      <div {...divs.get(0).props}>
          <img {...img.props} src={`/api/wines/${blackHorse.id}/image`} />
          <div {...divs.get(1).props}>{blackHorse.name}</div>
          <div {...divs.get(2).props}>
            <span {...spans.get(0).props}>Type</span>{blackHorse.type}
          </div>
          <div {...divs.get(3).props}>
            <span {...spans.get(1).props}>Région</span>{blackHorse.appellation.region}
          </div>
          <div {...divs.get(4).props}>
            <span {...spans.get(2).props}>Appellation</span>{blackHorse.appellation.name}
          </div>
          <div {...divs.get(5).props}>
            <span {...spans.get(3).props}>Cépages</span>{blackHorse.grapes.join(', ')}
          </div>
          <div {...divs.get(6).props}>
            <span {...spans.get(4).props}>like</span>
          </div>
      </div>
    )).to.equal(true);
  });
  it('doit afficher un bon vin avec le like', () => {
    const wrapper = shallow(
      <Wine wine={blackHorse} liked onToggleLike={nothing} />
    );
    const spans = wrapper.find('span');
    const divs = wrapper.find('div');
    const img = wrapper.find('img').get(0);
    expect(wrapper.equals(
      <div {...divs.get(0).props}>
          <img {...img.props} src={`/api/wines/${blackHorse.id}/image`} />
          <div {...divs.get(1).props}>{blackHorse.name}</div>
          <div {...divs.get(2).props}>
            <span {...spans.get(0).props}>Type</span>{blackHorse.type}
          </div>
          <div {...divs.get(3).props}>
            <span {...spans.get(1).props}>Région</span>{blackHorse.appellation.region}
          </div>
          <div {...divs.get(4).props}>
            <span {...spans.get(2).props}>Appellation</span>{blackHorse.appellation.name}
          </div>
          <div {...divs.get(5).props}>
            <span {...spans.get(3).props}>Cépages</span>{blackHorse.grapes.join(', ')}
          </div>
          <div {...divs.get(6).props}>
            <span {...spans.get(4).props}>unlike</span>
          </div>
      </div>
    )).to.equal(true);
  });
  it('doit gérer un click sur le like', () => {
    const onToggleLike = sinon.spy();
    const wrapper = shallow(
      <Wine wine={blackHorse} liked onToggleLike={onToggleLike} />
    );
    const spans = wrapper.find('span');
    const divs = wrapper.find('div');
    const img = wrapper.find('img').get(0);
    expect(wrapper.equals(
      <div {...divs.get(0).props}>
          <img {...img.props} src={`/api/wines/${blackHorse.id}/image`} />
          <div {...divs.get(1).props}>{blackHorse.name}</div>
          <div {...divs.get(2).props}>
            <span {...spans.get(0).props}>Type</span>{blackHorse.type}
          </div>
          <div {...divs.get(3).props}>
            <span {...spans.get(1).props}>Région</span>{blackHorse.appellation.region}
          </div>
          <div {...divs.get(4).props}>
            <span {...spans.get(2).props}>Appellation</span>{blackHorse.appellation.name}
          </div>
          <div {...divs.get(5).props}>
            <span {...spans.get(3).props}>Cépages</span>{blackHorse.grapes.join(', ')}
          </div>
          <div {...divs.get(6).props}>
            <span {...spans.get(4).props}>unlike</span>
          </div>
      </div>
    )).to.equal(true);
    spans.at(4).simulate('click', { target: { getAttribute: () => null }});
    expect(onToggleLike.calledOnce).to.equal(true);
  });
});
