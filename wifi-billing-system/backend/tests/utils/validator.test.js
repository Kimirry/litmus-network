const {
  isValidMac,
  isValidPhoneNumber,
  isPositiveNumber,
} = require('../../utils/validator');

describe('validator.js', () => {
  test('isValidMac detects valid MAC', () => {
    expect(isValidMac('AA:BB:CC:DD:EE:FF')).toBe(true);
    expect(isValidMac('aa-bb-cc-dd-ee-ff')).toBe(true);
  });

  test('isValidMac rejects invalid MAC', () => {
    expect(isValidMac('123')).toBe(false);
  });

  test('isValidPhoneNumber accepts Kenyan 07.. format', () => {
    expect(isValidPhoneNumber('0712345678')).toBe(true);
  });

  test('isValidPhoneNumber rejects other formats', () => {
    expect(isValidPhoneNumber('254712345678')).toBe(false);
    expect(isValidPhoneNumber('12345')).toBe(false);
  });

  test('isPositiveNumber checks positivity', () => {
    expect(isPositiveNumber(10)).toBe(true);
    expect(isPositiveNumber(-1)).toBe(false);
  });
});
