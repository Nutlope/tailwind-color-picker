import paper from 'paper';

const kStrokeColor = new paper.Color('#646464');
const kHighlightStrokeColor = new paper.Color('#ff2020');
const kHighlightStrokeWidth = 3;

export interface PixelCellInit {
  pixelAt: paper.Point;
  pivot: paper.Point;
  size: number;
}

/**
 * A class representing a pixel on a paper.Raster.
 *
 * @remarks
 * The cell rectangle is located wthin a coordinate having one unit equalts to `size`.
 */
export class PixelCell {
  private rect: paper.Path.Rectangle;

  public static create(init: PixelCellInit) {
    const cell = new PixelCell(init);
    return cell;
  }

  constructor({ pixelAt, pivot, size }: PixelCellInit) {
    this.rect = new paper.Path.Rectangle({
      point: pixelAt.multiply(size),
      size: [size, size],
      strokeColor: kStrokeColor,
    });
    this.rect.pivot = pivot;
  }

  public get raw(): paper.Item {
    return this.rect;
  }

  public get position() {
    return this.rect.position;
  }

  /**
   * @remarks
   * Color string in hex.
   */
  public get color() {
    return this.rect.fillColor.toCSS(true);
  }

  public setColor(paperColor: paper.Color) {
    this.rect.fillColor = paperColor;
  }

  public highlight() {
    this.rect.bringToFront();
    this.rect.strokeColor = kHighlightStrokeColor;
    this.rect.strokeWidth = kHighlightStrokeWidth;
  }
}
