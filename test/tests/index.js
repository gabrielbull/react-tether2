import { expect } from 'chai';
import tether, { Overflow } from '../../src/index';

describe('index', () => {
  it('should be exported', () => {
    expect(tether).to.exist;
    expect(Overflow).to.exist;
  });
});
