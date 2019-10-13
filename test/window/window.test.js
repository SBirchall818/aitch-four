import React from 'react';
import { shallow } from 'enzyme';

import Window, { RESIZE } from '../../src/window/Window';

describe('Window :: ', () => {
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
});