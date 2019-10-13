import React from 'react';
import { css } from 'aphrodite';
import styles from './window-styles';

export const RESIZE = 'resize';

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
  }

  componentDidMount() {
    this.handleSizeChange();
    window.addEventListener(RESIZE, this.handleSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener(RESIZE, this.handleSizeChange);
  }

  handleSizeChange() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  handleClick(e) {
    e.preventDefault();
    const { x, y } = e.nativeEvent;
    const { windowHeight, balls } = this.state;
    const h = windowHeight - y;

    this.setState({ balls: balls.concat({ pos: { x, y, h }, vel: { x: 10, h: 10 } }) });
  }

  render() {
    const { windowHeight, windowWidth } = this.state;
    return (
      <div
        onClick={this.handleClick}
        className={css(styles.root)}
        style={{ height: windowHeight, width: windowWidth }}
      />
    );
  }
}

export default Window;
