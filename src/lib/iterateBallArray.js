import iterateBallFn from './iterateBallFn';
import outOfBoundsFilter from './outOfBoundsFilter';

const TICK_MS = 50;
const GRAVITY = -400;
const BOUNCE_COEFFICIENT = 0.5;
const ROLL_POS_EPSILON = 5;
const ROLL_VEL_EPSILON = 3;
const ROLLING_FRICTION_COEFFICIENT = 0.9;
const BALL_RADIUS = 15;

// Return an array with the next state of the balls
export default function iterateBallArray(ballArray, windowWidth, windowHeight) {
  const iteratedBalls = ballArray.map(iterateBallFn({
    ts: TICK_MS / 1000,
    gravity: GRAVITY,
    windowHeight,
    bounceCoefficient: BOUNCE_COEFFICIENT,
    rollPosEpsilon: ROLL_POS_EPSILON,
    rollVelEpsilon: ROLL_VEL_EPSILON,
    rollingFrictionCoefficient: ROLLING_FRICTION_COEFFICIENT,
  }));

  const remainingBalls = iteratedBalls.filter(outOfBoundsFilter(BALL_RADIUS, windowWidth));
  return remainingBalls;
}
