import React from 'react';
import { css } from 'aphrodite';
import styles from './window-styles';
import random from '../lib/random';
import Ball from '../ball/Ball';
import BallView from '../ball/BallView';
import iterateBallArray from '../lib/iterateBallArray';

export const RESIZE = 'resize';
export const TICK_MS = 50;

class Window extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0,
      balls: [],
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.handleSizeChange();
    window.addEventListener(RESIZE, this.handleSizeChange);
    const intervalRef = setInterval(this.tick, TICK_MS);
    this.setState({ intervalRef });
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.handleSizeChange);
    const { intervalRef } = this.state;
    clearInterval(intervalRef);
  }

  handleSizeChange() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  handleClick(e) {
    e.preventDefault();
    const { x, y } = e.nativeEvent;
    const { windowHeight, balls } = this.state;
    const h = windowHeight - y;

    const randomVelX = random(100);
    const randomVelH = random(100);
    this.setState({ balls: balls.concat(new Ball({ x, y, h }, { x: randomVelX, h: randomVelH })) });
  }

  tick() {
    const { balls, windowWidth, windowHeight } = this.state;
    const ballArrayNextState = iterateBallArray(balls, windowWidth, windowHeight);
    this.setState({ balls: ballArrayNextState });
  }

  render() {
    const { balls, windowWidth, windowHeight } = this.state;
    const ballList = balls.map((b) => <BallView key={b.key} x={b.pos.x} y={b.pos.y} />);
    return (
      <div
        onClick={this.handleClick}
        className={css(styles.root)}
        style={{ height: windowHeight, width: windowWidth }}
      >
        {ballList}
      </div>
    );
  }
}

export default Window;
