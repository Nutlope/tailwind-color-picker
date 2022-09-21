import chroma from 'chroma-js';

interface ColorChannel {
  h?: number;
  s?: number;
  v?: number;
  r?: number;
  g?: number;
  b?: number;
  a?: number;
}

export class HSVColor {
  public static create(h: number, s: number, v: number, a = 1) {
    return new HSVColor(h, s, v, a);
  }

  public static fromHEX(hex: string) {
    if (!chroma.valid(hex)) {
      console.warn('Invalid hex:', hex);
      return;
    }
    let alpha = parseInt(hex.substr(7, 2), 16) / 255;
    alpha = isNaN(alpha) ? 1 : alpha;

    const chromaColor = chroma(hex);
    const [h, s, v] = chromaColor.hsv();
    const color = new HSVColor(h, s, v, alpha);
    return color;
  }

  private h: number;
  private s: number;
  private v: number;
  private a = 1;
  private color: chroma.Color;

  constructor(h: number, s: number, v: number, a: number) {
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;
    this.color = chroma.hsv(h, s, v).alpha(a);
  }

  public get hsv(): ColorChannel {
    return {
      h: this.h,
      s: this.s,
      v: this.v,
    };
  }

  public get rgb(): ColorChannel {
    const [r, g, b] = this.color.rgb();
    return {
      r,
      g,
      b,
    };
  }

  public get hex(): string {
    return this.color.hex();
  }

  public get alpha(): number {
    return this.a;
  }

  public clone({
    h = this.h,
    s = this.s,
    v = this.v,
    a = this.a,
  }: ColorChannel = {}): HSVColor {
    return HSVColor.create(h, s, v, a);
  }

  public cloneRGB({
    r = this.rgb.r,
    g = this.rgb.g,
    b = this.rgb.b,
    a = this.a,
  }: ColorChannel = {}): HSVColor {
    const [h, s, v] = chroma(r, g, b).alpha(a).hsv();
    // h would be NaN for white, black and gray.
    return HSVColor.create(h || this.h, s, v, a);
  }

  public css(): string {
    return this.color.css();
  }

  public hueCss(): string {
    return chroma.hsv(this.h, 1, 1).css();
  }

  public rgbCss(): string {
    return this.color.alpha(1).css();
  }
}
