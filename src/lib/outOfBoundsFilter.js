export default function outOfBoundsFilter(ballRadius, windowWidth) {
  return (b) => {
    if (b.pos.x + ballRadius < 0
      || b.pos.x - ballRadius > windowWidth
      || b.pos.h < 0) return false;
    return true;
  };
}
