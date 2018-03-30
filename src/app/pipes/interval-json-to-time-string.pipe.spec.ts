import { IntervalJsonToTimeStringPipe } from './interval-json-to-time-string.pipe';

describe('IntervalJsonToTimeStringPipe', () => {
  it('create an instance', () => {
    const pipe = new IntervalJsonToTimeStringPipe();
    expect(pipe).toBeTruthy();
  });
});
