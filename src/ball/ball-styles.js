import { StyleSheet } from 'aphrodite';
import { BALL_RADIUS } from '../lib/settings';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    backgroundColor: 'hsla(120, 87%, 46%, 0.68)',
    height: `${BALL_RADIUS * 2}px`,
    width: `${BALL_RADIUS * 2}px`,
    borderRadius: '50%',
    transform: `translate(-${BALL_RADIUS}px, -${BALL_RADIUS * 2}px)`,
  },
});

export default styles;
