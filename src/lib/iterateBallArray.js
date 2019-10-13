const TICK_MS = 50;
const GRAVITY = -400;

export function iterateBallFn({
  ts,
  gravity,
  windowHeight,
}) {
  return (ball) => {
    const b = { ...ball };
    // Iterate ball position along x axis
    b.pos.x += b.vel.x * ts;
    // Iterate gravity's effect on vertical velocity
    b.vel.h += gravity * ts;
    // Iterate vertical velocity's effect on height
    b.pos.h += b.vel.h * ts;

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
  }));

  return iteratedBalls;
}
