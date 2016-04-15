/* eslint no-undef:0, no-unused-vars:0, react/jsx-closing-bracket-location: 0, react/jsx-max-props-per-line: 0 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { WineList } from '../../src/components/wine-list';

const wines = [
  {
    "id": "chevrol-bel-air",
    "name": "Château Chevrol Bel Air",
    "type": "Rouge",
    "appellation": {"name": "Lalande-de-Pomerol", "region": "Bordeaux"},
    "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
  },
  {
    "id": "clarendelle",
    "name": "Clarendelle",
    "type": "Blanc",
    "appellation": {"name": "Bordeaux", "region": "Bordeaux"},
    "grapes": ["Sauvignon", "Sémillon", "Muscadelle"]
  },
  {
    "id": "cheval-noir",
    "name": "Cheval Noir",
    "type": "Rouge",
    "appellation": {"name": "Saint-Emilion", "region": "Bordeaux"},
    "grapes": ["Cabernet Sauvignon", "Merlot", "Cabernet Franc"]
  }
];

describe('<WineList />', () => {
  it('doit afficher des vins', () => {
    const wrapper = shallow(
      <WineList wines={wines} selected={null} onWineChange={null} />
    );
    const children = wrapper.get(0).props.children;
    expect(wrapper.equals(
      <div>
        <div {...children[0].props}>{wines[0].name}</div>
        <div {...children[1].props}>{wines[1].name}</div>
        <div {...children[2].props}>{wines[2].name}</div>
      </div>
    )).to.equal(true);
  });
  it('doit gérer le click sur un vin', () => {
    const onWineChange = sinon.spy();
    const wrapper = shallow(
      <WineList wines={wines} onWineChange={onWineChange} />
    );
    const children = wrapper.get(0).props.children;
    expect(wrapper.equals(
      <div>
        <div {...children[0].props}>{wines[0].name}</div>
        <div {...children[1].props}>{wines[1].name}</div>
        <div {...children[2].props}>{wines[2].name}</div>
      </div>
    )).to.equal(true);
    wrapper.find('div').at(3).simulate('click', { target: { getAttribute: () => null }});
    expect(onWineChange.calledOnce).to.equal(true);
  });
});
