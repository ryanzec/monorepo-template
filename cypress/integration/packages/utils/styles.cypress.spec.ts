import * as stylesUtils from '$utils/styles';

describe('styles utils', () => {
  it('get spacing works properly', () => {
    expect(stylesUtils.getSpacing(3)).to.equal('12px');
  });
});
