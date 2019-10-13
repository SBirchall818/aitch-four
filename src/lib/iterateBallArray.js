import * as settings from './settings';
import iterateBallFn from './iterateBallFn';
import outOfBoundsFilter from './outOfBoundsFilter';

// Return an array with the next state of the balls
export default function iterateBallArray(ballArray, windowWidth, windowHeight) {
  const iteratedBalls = ballArray.map(iterateBallFn({
    ts: settings.TICK_MS / 1000,
    gravity: settings.GRAVITY,
    windowHeight,
    bounceCoefficient: settings.BOUNCE_COEFFICIENT,
    rollPosEpsilon: settings.ROLL_POS_EPSILON,
    rollVelEpsilon: settings.ROLL_VEL_EPSILON,
    rollingFrictionCoefficient: settings.ROLLING_FRICTION_COEFFICIENT,
  }));

  const remainingBalls = iteratedBalls.filter(outOfBoundsFilter(settings.BALL_RADIUS, windowWidth));
  return remainingBalls;
}
