import Ball from '../../src/ball/Ball';
import { iterateBallFn } from '../../src/lib/iterateBallArray';

const testSettings = {
  ts: 0.1,
  gravity: -400,
  windowHeight: 1000,
  bounceCoefficient: 0.5,
  rollPosEpsilon: 5,
  rollVelEpsilon: 3,
};

describe('iterateBallArray :: ', () => {
  it('should have iterateBallFn', () => {
    expect(iterateBallFn).toBeDefined();
  });

  it('should return a function from setting input', () => {
    const perBallIterationFn = iterateBallFn(testSettings);
    expect(typeof perBallIterationFn).toBe('function');
  });

  it('should iterate free floating balls with gravity', () => {
    const perBallIterationFn = iterateBallFn(testSettings);
    const ballArray = [new Ball({x: 100, y: 500, h: 500}, {x: 100, h: 100})];
    const result = ballArray.map(perBallIterationFn);
    expect(result[0].pos.x).toEqual(110);
    expect(result[0].pos.h).toEqual(506);
    expect(result[0].vel.x).toEqual(100);
    expect(result[0].vel.h).toEqual(60);
  });

  it('should bounce balls that hit the bottom', () => {
    const perBallIterationFn = iterateBallFn(testSettings);
    const initialH = 2;
    const initialY = testSettings.windowHeight - initialH;
    const ballArray = [new Ball({x: 100, y: initialY, h: initialH}, {x: 0, h: -100})];
    const result = ballArray.map(perBallIterationFn);
    expect(result[0].pos.x).toEqual(100);
    expect(result[0].pos.h).toEqual(0);
    expect(result[0].vel.x).toEqual(0);
    expect(result[0].vel.h).toEqual(70);
  });

  it('should put low bouncing balls into roll mode', () => {
    const perBallIterationFn = iterateBallFn(testSettings);
    const initialH = 2;
    const initialY = testSettings.windowHeight - initialH;
    const ballArray = [new Ball({x: 100, y: initialY, h: initialH}, {x: 100, h: -1})];
    expect(ballArray[0].rolling).toBe(false);

    const result = ballArray.map(perBallIterationFn);
    expect(result[0].rolling).toBe(true);
    expect(result[0].pos.x).toEqual(110);
    expect(result[0].pos.h).toEqual(0);
    expect(result[0].vel.x).toEqual(100);
    expect(result[0].vel.h).toEqual(0);
  });
});