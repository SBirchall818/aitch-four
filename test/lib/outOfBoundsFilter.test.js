import Ball from '../../src/ball/Ball';
import outOfBoundsFilter from '../../src/lib/outOfBoundsFilter';

const TEST_BALL_RADIUS = 10;
const TEST_WINDOW_WIDTH = 500;
const WINDOW_HEIGHT = 1000;

describe('outOfBoundsFilter :: ', () => {
  it('should have outOfBoundsFilter', () => {
    expect(outOfBoundsFilter).toBeDefined();
  });

  it('should remove balls from left hand side which are fully off screen', () => {
    const perBallOutOfBoundsFilterFn = outOfBoundsFilter(TEST_BALL_RADIUS, TEST_WINDOW_WIDTH);
    const initialH = 20;
    const initialY = WINDOW_HEIGHT - initialH;
    const ballArray = [
      new Ball({x: -5, y: initialY, h: initialH}, {x: 0, h: 0}),
      new Ball({x: -25, y: initialY, h: initialH}, {x: 0, h: 0}),
    ];

    const result = ballArray.filter(perBallOutOfBoundsFilterFn);
    expect(result.length).toEqual(1);
    expect(result[0].pos.x).toEqual(-5);
  });

  it('should remove balls from right hand side that are fully offscreen', () => {
    const perBallOutOfBoundsFilterFn = outOfBoundsFilter(TEST_BALL_RADIUS, TEST_WINDOW_WIDTH);
    const initialH = 20;
    const initialY = WINDOW_HEIGHT - initialH;
    const ballArray = [
      new Ball({x: TEST_WINDOW_WIDTH, y: initialY, h: initialH}, {x: 0, h: 0}),
      new Ball({x: TEST_WINDOW_WIDTH + TEST_BALL_RADIUS + 1, y: initialY, h: initialH}, {x: 0, h: 0}),
    ];

    const result = ballArray.filter(perBallOutOfBoundsFilterFn);
    expect(result.length).toEqual(1);
    expect(result[0].pos.x).toEqual(TEST_WINDOW_WIDTH);
  });

  it('should remove balls that might have gone below the bottom line', () => {
    const perBallOutOfBoundsFilterFn = outOfBoundsFilter(TEST_BALL_RADIUS, TEST_WINDOW_WIDTH);
    const initialH = 20;
    const initialY = WINDOW_HEIGHT - initialH;
    const ballArray = [
      new Ball({x: TEST_WINDOW_WIDTH, y: initialY, h: initialH}, {x: 0, h: 0}),
      new Ball({x: TEST_WINDOW_WIDTH, y: -initialY, h: -initialH}, {x: 0, h: 0}),
    ];

    const result = ballArray.filter(perBallOutOfBoundsFilterFn);
    expect(result.length).toEqual(1);
    expect(result[0].pos.x).toEqual(TEST_WINDOW_WIDTH);
  });
});