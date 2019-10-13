import Ball from '../../src/ball/Ball';
import { iterateBallFn } from '../../src/lib/iterateBallArray';

const testSettings = {
  ts: 0.1,
  gravity: -400,
  windowHeight: 1000,
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
});