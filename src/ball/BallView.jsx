import React from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';
import styles from './ball-styles';

const BallView = ({ x, y }) => (
  <span className={css(styles.root)} style={{ left: x, top: y }} />
);

BallView.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

BallView.defaultProps = {
  x: 0,
  y: 0,
};

export default BallView;
