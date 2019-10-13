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
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
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

  render() {
    const { windowHeight, windowWidth } = this.state;
    return (
      <div className={css(styles.root)} style={{ height: windowHeight, width: windowWidth }} />
    );
  }
}

export default Window;
