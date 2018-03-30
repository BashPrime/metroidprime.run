import { MillisecondsToTimeStringPipe } from './milliseconds-to-time-string.pipe';

describe('MillisecondsToTimeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new MillisecondsToTimeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
