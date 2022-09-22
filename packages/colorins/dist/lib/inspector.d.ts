import { PaperProject } from './paper-project';
export declare class Inspector {
    private project;
    onCopy: (_color: string) => void;
    private group;
    private cells;
    private raster;
    private get targetCell();
    constructor(project: PaperProject);
    loadImage(img: HTMLImageElement): void;
    /**
     * Update inspector's position.
     *
     * @remarks
     * Update cell colors in the meanwhile if having the rater image.
     */
    private moveTo;
    /**
     * Initialize inspector UI items, including the cursor and circular magnifier.
     */
    private initUI;
    /**
     * Keep inspector's position sync with mouse.
     */
    private trackMouse;
    /**
     * Deal with system copy and snackbar.
     */
    private handleColorCopy;
}
