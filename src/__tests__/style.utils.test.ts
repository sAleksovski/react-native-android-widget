import { convertColor } from '../widgets/utils/style.utils';

import { describe, expect, test } from '@jest/globals';

describe('#convertColor', () => {
  test('should convert full hex color', () => {
    expect(convertColor('#ff0000')).toEqual('#ff0000');
  });

  test('should convert shorthand hex color', () => {
    expect(convertColor('#f00')).toEqual('#ff0000');
  });

  test('should convert rgba to argb', () => {
    expect(convertColor('#ff000085')).toEqual('#85ff0000');
  });

  test('should convert shorthand rgba to argb', () => {
    expect(convertColor('#f008')).toEqual('#88ff0000');
  });

  test('should convert rgba', () => {
    expect(convertColor('rgba(255, 0, 0, 1)')).toEqual('#ffff0000');
    expect(convertColor('rgba(100, 200, 255, 0.4)')).toEqual('#6664c8ff');
  });

  test('should normalize rgba color', () => {
    expect(convertColor('rgba(100, 200, 300, 1.4)')).toEqual('#ff64c8ff');
  });
});
