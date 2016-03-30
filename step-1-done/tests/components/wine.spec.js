/* eslint no-undef:0 */

import React from 'react';
import { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

import Wine from '../../src/components/wine';

describe('Wine', () => {
  it('affiche le nom du vin', () => {
    const wine = ReactTestUtils.renderIntoDocument(<Wine name="Un bon Bourgogne" />);
    const div = ReactTestUtils.findRenderedDOMComponentWithTag(wine, 'div');
    expect(div.textContent).to.be.equal('Un bon Bourgogne');
  });
});
