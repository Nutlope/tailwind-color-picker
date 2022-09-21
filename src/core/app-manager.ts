import { Inspector } from 'colorins';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { CapturedTab, MessageService } from '~/common';
import { App, Snackbar } from '~/elements';

@injectable()
export class AppManager {
  constructor(
    private app: App,
    private inspector: Inspector,
    private snackbar: Snackbar,
    private messageService: MessageService,
  ) {
    this.app.hide();
    this.handleViewportChange();
    this.handleMessage();
    this.handleColorCopy();
    this.app.hide();
  }

  private handleMessage() {
    this.messageService.on('toggleInspector', this.toggleInspector);
  }

  /**
   * Keep capturing current tab image when viewport changed.
   */
  private handleViewportChange() {
    let timerId: number;
    const debounceSend = () => {
      if (!this.app.visible) {
        return;
      }
      window.clearTimeout(timerId);
      this.app.hide();
      timerId = window.setTimeout(() => {
        this.requestCapture();
      }, 200);
    };
    window.addEventListener('scroll', debounceSend);
    window.addEventListener('resize', debounceSend);
  }

  private async requestCapture() {
    const detail = await this.messageService.send<CapturedTab>(
      'requestCapture',
    );
    this.updateImage(detail);
  }

  /**
   * Sync inspector's image with captured tab.
   */
  private updateImage = (detail: CapturedTab) => {
    const { imgSrc, width, height } = detail;
    const img = new Image(width, height);
    img.src = imgSrc;
    this.inspector.loadImage(img);
    this.app.show();
  };

  private toggleInspector = () => {
    const nextValue = !this.app.visible;
    if (nextValue) {
      this.requestCapture();
      this.app.show();
    } else {
      this.app.hide();
    }
    return nextValue;
  };

  private handleColorCopy() {
    this.inspector.onCopy = (color) => {
      this.snackbar.notifyColorCopy(color);
    };
  }
}
