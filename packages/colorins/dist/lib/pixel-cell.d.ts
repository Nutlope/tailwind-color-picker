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
export declare class PixelCell {
    private rect;
    static create(init: PixelCellInit): PixelCell;
    constructor({ pixelAt, pivot, size }: PixelCellInit);
    get raw(): paper.Item;
    get position(): paper.Point;
    /**
     * @remarks
     * Color string in hex.
     */
    get color(): string;
    setColor(paperColor: paper.Color): void;
    highlight(): void;
}
