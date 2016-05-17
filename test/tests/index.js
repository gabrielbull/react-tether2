import { expect } from 'chai';
import tether from '../../src/index';

describe('index', () => {
  it('should be exported', () => {
    expect(tether).to.exist;
  });
});
