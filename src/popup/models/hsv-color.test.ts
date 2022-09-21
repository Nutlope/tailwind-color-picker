import { HSVColor } from './hsv-color';

describe('HSVColor', () => {
  it('should create', () => {
    const color = HSVColor.create(0, 1, 1);
    expect(color).toBeTruthy();
  });

  it('should get hue css', () => {
    const color = HSVColor.create(23, 0.3, 0.1);
    const hueColor = HSVColor.create(23, 1, 1);
    expect(color.hueCss()).toEqual(hueColor.css());
  });

  it('should clone', () => {
    const color = HSVColor.create(23, 0.3, 0.1);
    const cloned = color.clone();
    expect(cloned.css()).toEqual(color.css());
    expect(cloned).not.toBe(color);
  });
});
