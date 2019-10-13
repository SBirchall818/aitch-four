const TICK_MS = 50;
const GRAVITY = -400;
const BOUNCE_COEFFICIENT = 0.5;
const ROLL_POS_EPSILON = 5;
const ROLL_VEL_EPSILON = 3;
const ROLLING_FRICTION_COEFFICIENT = 0.9;

export function iterateBallFn({
  ts,
  gravity,
  windowHeight,
  bounceCoefficient,
  rollPosEpsilon,
  rollVelEpsilon,
  rollingFrictionCoefficient,
}) {
  return (ball) => {
    const b = { ...ball };

    // If not already rolling and close to the bottom of the screen
    // with a small absolute vertical velocity then set vertical position
    // and velocity to zero and set into rolling mode
    if (!b.rolling && b.pos.h < rollPosEpsilon && Math.abs(b.vel.h) < rollVelEpsilon) {
      b.pos.h = 0;
      b.vel.h = 0;
      b.rolling = true;
    }

    // Iterate ball position along x axis even if rolling
    b.pos.x += b.vel.x * ts;

    if (b.rolling) {
      // slow x down
      b.vel.x *= rollingFrictionCoefficient;
    }
    if (!b.rolling) {
      // Iterate gravity's effect on vertical velocity
      b.vel.h += gravity * ts;
      // Iterate vertical velocity's effect on height
      b.pos.h += b.vel.h * ts;

      // If ball has dropped below bottom of screen
      // then bounce the ball
      if (b.pos.h < 0) {
        b.vel.h *= -bounceCoefficient;
        b.pos.h = 0;
      }
    }

    // Recalculate y for window positioning
    b.pos.y = windowHeight - b.pos.h;
    return b;
  };
}

// Return an array with the next state of the balls
export default function iterateBallArray(ballArray, windowHeight) {
  const iteratedBalls = ballArray.map(iterateBallFn({
    ts: TICK_MS / 1000,
    gravity: GRAVITY,
    windowHeight,
    bounceCoefficient: BOUNCE_COEFFICIENT,
    rollPosEpsilon: ROLL_POS_EPSILON,
    rollVelEpsilon: ROLL_VEL_EPSILON,
    rollingFrictionCoefficient: ROLLING_FRICTION_COEFFICIENT,
  }));

  return iteratedBalls;
}
