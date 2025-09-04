const { generateRandomCode, formatPhoneNumber } = require('../../utils/helper');

describe('helper.js', () => {
  test('generateRandomCode returns correct length', () => {
    const code = generateRandomCode(8);
    expect(code).toHaveLength(8);
  });

  test('generateRandomCode uses uppercase alphanumeric characters', () => {
    const code = generateRandomCode(10);
    expect(/^[A-Z0-9]+$/.test(code)).toBe(true);
  });

  test('formatPhoneNumber converts 07.. to 254..', () => {
    expect(formatPhoneNumber('0712345678')).toBe('254712345678');
  });
});
