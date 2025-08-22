import { describe, expect, test } from "vitest"
import { dayToKor, getImage } from "./helper";

describe('Helper Functions', () => {
  test('getImage function returns valid URL', () => {
    const path = 'example'
    const url = getImage(path);
    expect(url).not.toBeUndefined();
    expect(url).not.toBeNull();
    expect(url).toContain('assets/images/icon')
    expect(url).toContain('example.png')
  })
  test('dayTokor returns correct day array', () => {
    const expected = [
      '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'
    ]
    expect(dayToKor.length).toBe(7)
    dayToKor.forEach((day) => {
      expect(typeof day).toBe('string')
    })
    expect(dayToKor).toEqual(expected)
  })
})
