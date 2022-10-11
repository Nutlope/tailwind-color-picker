import { injectable } from 'inversify';
import { toPromise } from '~/common';
import 'reflect-metadata';

@injectable()
export class ContentInjector {
  public async inject(tabId: number): Promise<void> {
    const isInjected = await this.isInjected(tabId);
    if (isInjected) {
      return;
    }

    return toPromise<void>(chrome.scripting.executeScript)({
      target: { tabId },
      files: ['content.js'],
    });
  }

  public async getActiveTabId(): Promise<number> {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });
    return tabs[0].id;
  }

  private runCode() {
    const a = document.querySelector('ac-root');
    return a ? true : null;
  }

  private async isInjected(tabId: number) {
    const results = await toPromise<any>(chrome.scripting.executeScript)({
      target: { tabId },
      func: this.runCode,
    });

    return results[0].result;
  }
}
