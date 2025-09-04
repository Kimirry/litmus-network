const { cleanMac, standardizeMac } = require('../../utils/macHelper');

describe('macHelper.js', () => {
  test('cleanMac strips invalid characters and uppercases', () => {
    expect(cleanMac('aa:bb:cc:dd:ee:ff')).toBe('AABBCCDDEEFF');
    expect(cleanMac('aa-bb-cc-dd-ee-ff')).toBe('AABBCCDDEEFF');
  });

  test('standardizeMac returns colon-separated uppercase MAC', () => {
    expect(standardizeMac('aa-bb-cc-dd-ee-ff')).toBe('AA:BB:CC:DD:EE:FF');
  });
});
