import { Speaker } from './speaker.schema';

describe('Speaker', () => {
  it('should be defined', () => {
    expect(new Speaker()).toBeDefined();
  });
});
