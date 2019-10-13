import React from 'react';
import renderer from 'react-test-renderer';
import { StyleSheetTestUtils } from 'aphrodite';
import { shallow } from 'enzyme';

import Ball from '../../src/ball/Ball';
import BallView from '../../src/ball/BallView';
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

  it('should render Window defaults', () => {
    const component = renderer.create(<Window />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders balls when balls are in state', () => {
    const appComponent = shallow(<Window />);
    const balls = [
      new Ball({x: 50, y: 50, h: 718}, {x: 20, h: 20}),
      new Ball({x: 150, y: 150, h: 618}, {x: -20, h: -20}),
    ];
    appComponent.setState({balls});
    expect(appComponent.find(BallView).length).toBe(2);
  });
});