require('jest-webextension-mock');

type MessageListener = (
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: any) => void
) => void;

const listeners: MessageListener[] = [];
chrome.tabs.sendMessage = (
  _tabId: number,
  message: any,
  options: any,
  responseCallback?: (response: any) => void
) => {
  if (responseCallback === undefined) {
    responseCallback = options;
  }
  listeners.forEach((messageListener) => {
    messageListener(message, {}, responseCallback);
  });
};

chrome.runtime.onMessage.addListener = (callback: MessageListener) => {
  listeners.push(callback);
};
