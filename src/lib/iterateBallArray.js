const TICK_MS = 50;
const GRAVITY = -400;
const BOUNCE_COEFFICIENT = 0.5;

export function iterateBallFn({
  ts,
  gravity,
  windowHeight,
  bounceCoefficient,
}) {
  return (ball) => {
    const b = { ...ball };
    // Iterate ball position along x axis
    b.pos.x += b.vel.x * ts;
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
  }));

  return iteratedBalls;
}
