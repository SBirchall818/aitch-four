import { StyleSheet } from 'aphrodite';
import { BALL_RADIUS } from '../lib/settings';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    backgroundColor: 'green',
    height: `${BALL_RADIUS * 2}px`,
    width: `${BALL_RADIUS * 2}px`,
    borderRadius: '50%',
    transform: `translate(-${BALL_RADIUS}px, -${BALL_RADIUS * 2}px)`,
  },
});

export default styles;
