export default function iterateBallFn({
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

    if (b.active) {
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
        // slow x down by applying rolling friction coefficient
        b.vel.x *= rollingFrictionCoefficient;

        // Deactivate slow rolling balls
        if (Math.abs(b.vel.x) < rollVelEpsilon) {
          b.vel.x = 0;
          b.active = false;
        }
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
    }

    // Recalculate y for window positioning
    b.pos.y = windowHeight - b.pos.h;
    return b;
  };
}
