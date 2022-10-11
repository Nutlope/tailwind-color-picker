import { injectable } from 'inversify';
import {
  ContentInjector,
  container,
  MessageService,
  toPromise,
  CapturedTab,
} from '~/common';
import 'regenerator-runtime/runtime';
import 'reflect-metadata';

@injectable()
class BackgroundMain {
  constructor(
    private messageService: MessageService,
    private contentInjector: ContentInjector,
  ) {
    chrome.runtime.onInstalled.addListener(() => {
      console.log('AnyColor installed.');
    });

    this.messageService.on('requestCapture', this.captureVisibleTab);
    this.handleCommands();
    this.handleBrowserAction();
  }

  private captureVisibleTab = async (): Promise<CapturedTab> => {
    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });
    const latestTab = tabs[0];
    const zoom: number = await toPromise<number>(chrome.tabs.getZoom)();
    const width = latestTab.width / zoom;
    const height = latestTab.height / zoom;

    const imgSrc = await toPromise<string>(chrome.tabs.captureVisibleTab)(
      null,
      {
        format: 'png',
      },
    );

    const capturedTab = {
      imgSrc,
      width,
      height,
    };
    console.log('captureVisibleTab:', capturedTab);
    return capturedTab;
  };

  private handleCommands() {
    chrome.commands.onCommand.addListener(async (command: string) => {
      if (command === 'toggle-inspector') {
        const tabId = await this.contentInjector.getActiveTabId();
        this.toggleInspector(tabId);
      }
    });
  }

  private handleBrowserAction() {
    chrome.action.onClicked.addListener(({ id }) => {
      this.toggleInspector(id);
    });
  }

  /**
   * @remarks
   * Ensure content script is injected and send message to the active tab.
   */
  private async toggleInspector(tabId: number) {
    await this.contentInjector.inject(tabId);
    this.messageService.sendTab('toggleInspector');
  }
}

container.bind<BackgroundMain>(BackgroundMain).toSelf();
container.bind<ContentInjector>(ContentInjector).toSelf();
container.resolve(BackgroundMain);

// /**
//  * Recursively get all FileEntry and DirectoryEntry.
//  */
// async function getAllEntries(dir: DirectoryEntry) {
//   const reader = dir.createReader();
//   const entries = await toPromise<Entry[]>(reader.readEntries.bind(reader))();
//   const result = [];
//   while (entries[0]) {
//     const entry = entries.shift();
//     if (entry.isFile) {
//       result.push(entry);
//     } else {
//       const subEntries = await getAllEntries(entry as DirectoryEntry);
//       subEntries.forEach((e) => result.push(e));
//     }
//   }
//   return result;
// }

// async function watchChanges() {
//   const dir = await toPromise<DirectoryEntry>(
//     chrome.runtime.getPackageDirectoryEntry
//   )();
//   const entries = await getAllEntries(dir);

//   const modificationTimeMap: { [fullPath: string]: Date } = {};
//   await Promise.all(
//     entries.map((entry) =>
//       toPromise<Metadata>(entry.getMetadata.bind(entry))().then(
//         ({ modificationTime }) => {
//           modificationTimeMap[entry.fullPath] = modificationTime;
//         }
//       )
//     )
//   );

//   window.setInterval(() => {
//     entries.forEach(async (entry) => {
//       const metadata = await toPromise<Metadata>(
//         entry.getMetadata.bind(entry)
//       )();

//       if (
//         modificationTimeMap[entry.fullPath].getTime() !==
//         metadata.modificationTime.getTime()
//       ) {
//         chrome.runtime.reload();
//       }
//     });
//   }, 1000);
// }

// chrome.management.getSelf((self) => {
//   if (self.installType === 'development') {
//     console.log(`start hot reload at ${new Date().toLocaleString()}`);
//     //watchChanges();
//   }
// });
