import { styleUtils } from '$/utils/style';

describe('styles utils', () => {
  it('get spacing works properly', () => {
    expect(styleUtils.getSpacing(3)).to.equal('12px');
  });
});
