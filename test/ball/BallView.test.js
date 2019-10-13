import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite';

import BallView from '../../src/ball/BallView';

describe('BallView :: ', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should exist', () => {
    expect(BallView).toBeDefined();
  });

  it('should render BallView with defaults', () => {
    const component = renderer.create(<BallView />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
