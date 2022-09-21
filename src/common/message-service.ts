import { injectable } from 'inversify';
import { toPromise } from './utils';
import 'reflect-metadata';

interface EventPayload {
  eventName: string;
  detail?: EventDetail;
}

type EventCallback<T> = (detail: EventDetail) => T | Promise<T>;

export type EventDetail = {};

@injectable()
export class MessageService {
  private eventMap: {
    [eventName: string]: EventCallback<string | number | {}>;
  } = {};

  constructor() {
    this.handleMessages();
  }

  /**
   * Send message to a {@link chrome.tabs.Tab}.
   */
  public async sendTab<T>(eventName: string, detail = {}): Promise<T> {
    if (!chrome.tabs) {
      return Promise.resolve(null);
    }

    const tabs = await toPromise<chrome.tabs.Tab[]>(chrome.tabs.query)({
      active: true,
      currentWindow: true,
    });

    return toPromise<T>(chrome.tabs.sendMessage)(tabs[0].id, {
      eventName,
      detail,
    } as EventPayload);
  }

  /**
   * Send message to runtime (background script).
   */
  public async send<T>(eventName: string, detail = {}): Promise<T> {
    return toPromise<T>(chrome.runtime.sendMessage)({
      eventName,
      detail,
    } as EventPayload);
  }

  public on<T>(eventName: string, callback: EventCallback<T>) {
    this.eventMap[eventName] = callback;
  }

  private handleMessages() {
    if (!chrome.runtime.onMessage) {
      return;
    }
    chrome.runtime.onMessage.addListener(
      (payload: EventPayload, _sender, sendResponse) => {
        const callback = this.eventMap[payload.eventName];
        if (callback) {
          Promise.resolve(callback(payload.detail)).then((result) => {
            sendResponse(result);
          });
        }
        // keep the connection open during the async execution
        return true;
      }
    );
  }
}
