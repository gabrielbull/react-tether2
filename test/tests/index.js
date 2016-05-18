import { expect } from 'chai';
import tether, { Overflow, Dropdown } from '../../src/index';

describe('index', () => {
  it('should be exported', () => {
    expect(tether).to.exist;
    expect(Overflow).to.exist;
    expect(Dropdown).to.exist;
  });
});
