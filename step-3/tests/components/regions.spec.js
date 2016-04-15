/* eslint no-undef:0, no-unused-vars:0, react/jsx-closing-bracket-location: 0, react/jsx-max-props-per-line: 0 */

import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { Regions } from '../../src/components/regions';

describe('<Regions />', () => {
  it('doit afficher des régions', () => {
    const regions = ['region 1', 'region 2', 'region 3'];
    const wrapper = shallow(
      <Regions regions={regions} />
    );
    const children = wrapper.get(0).props.children;
    expect(wrapper.equals(
      <div>
        <div {...children[0].props}>region 1</div>
        <div {...children[1].props}>region 2</div>
        <div {...children[2].props}>region 3</div>
      </div>
    )).to.equal(true);
  });
  it('doit gérer le click sur une région', () => {
    const regions = ['region 1', 'region 2', 'region 3'];
    const onRegionChange = sinon.spy();
    const wrapper = shallow(
      <Regions
          regions={regions}
          onRegionChange={onRegionChange} />
    );
    const children = wrapper.get(0).props.children;
    expect(wrapper.equals(
      <div>
        <div {...children[0].props}>region 1</div>
        <div {...children[1].props}>region 2</div>
        <div {...children[2].props}>region 3</div>
      </div>
    )).to.equal(true);
    wrapper.find('div').at(3).simulate('click', { target: { textContent: '...' }});
    expect(onRegionChange.calledOnce).to.equal(true);
  });
});
