import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite';
import { shallow } from 'enzyme';

import Window, { RESIZE } from '../../src/window/Window';

describe('Window :: ', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('should exist', () => {
    expect(Window).toBeDefined();
  });

  it('should change state on window resize event', () => {
    const newHeight = 600;
    const newWidth = 500;

    const appComponent = shallow(<Window />);
    global.innerWidth = newWidth;
    global.innerHeight = newHeight;
    global.dispatchEvent(new Event(RESIZE));
    expect(appComponent.state().windowWidth).toEqual(newWidth);
    expect(appComponent.state().windowHeight).toEqual(newHeight);
  });

  it('adds a ball to App state when it is clicked', () => {
    const clickCoord = {x: 100, y: 120};
    const appComponent = shallow(<Window />);
    appComponent.find('div').simulate('click', { preventDefault() {}, nativeEvent: clickCoord });
    expect(appComponent.state().balls.length).toEqual(1);
    expect(appComponent.state().balls[0].pos.x).toEqual(clickCoord.x);
    expect(appComponent.state().balls[0].pos.y).toEqual(clickCoord.y);
  });
});