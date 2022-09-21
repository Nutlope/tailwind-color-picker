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

export class ChromaColor {
  public static create(colorString: string) {
    const chromaColor = chroma(colorString);
    return new ChromaColor(chromaColor);
  }

  public static fromHSV(h: number, s: number, v: number) {
    const chromaColor = chroma(h, s, v, 'hsv');
    return new ChromaColor(chromaColor);
  }

  public static fromRGB(r: number, g: number, b: number) {
    const chromaColor = chroma(r, g, b, 'rgb');
    return new ChromaColor(chromaColor);
  }

  constructor(private color: chroma.Color) {}

  public get hsv(): ColorChannel {
    const [h, s, v] = this.color.hsv();
    return {
      h: isNaN(h) ? 0 : h,
      s,
      v,
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
    return this.color.alpha();
  }

  public set alpha(a: number) {
    this.color = this.color.alpha(a);
  }

  public clone(payload: ColorChannel = {}): ChromaColor {
    const hsv = this.hsv;
    const { h = hsv.h, s = hsv.s, v = hsv.v, a = this.alpha } = payload;
    const chromaColor = ChromaColor.fromHSV(h, s, v);
    chromaColor.alpha = a;
    return chromaColor;
  }

  public cloneRGB({
    r = this.rgb.r,
    g = this.rgb.g,
    b = this.rgb.b,
    a = this.alpha,
  }: ColorChannel = {}): ChromaColor {
    const chromaColor = ChromaColor.fromRGB(r, g, b);
    chromaColor.alpha = a;
    return chromaColor;
  }

  public css(): string {
    // Note: chroma.js's bug: the css() function actually changes the color instance itself
    return this.color.alpha(this.alpha).css();
  }

  public hueCss(): string {
    return chroma.hsv(this.hsv.h, 1, 1).css();
  }

  public rgbCss(): string {
    return this.color.alpha(1).css();
  }
}
