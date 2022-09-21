import { AppManager } from './app-manager';
import { container, MessageService } from '~/common';
import { afterInjected } from '~/content';
import { App } from '~/elements';

describe('AppManager', () => {
  let appManager: AppManager;
  let app: App;
  let messageService: MessageService;

  beforeAll(async () => {
    appManager = await afterInjected;
    app = container.get(App);
    messageService = container.get(MessageService);
  });

  it('should create a AppManager instance', () => {
    expect(appManager).toBeTruthy();
  });

  it('app should be invisible when boot', () => {
    expect(app.visible).toBeFalsy();
  });

  it('should toggle app by message, from visible to invisible', async () => {
    app.show();
    expect(app.visible).toBe(true);
    await messageService.sendTab('toggleInspector');
    expect(app.visible).toBe(false);
  });

  it('should toggle app by message, from invisible to visible', async () => {
    app.hide();
    expect(app.visible).toBe(false);
    await messageService.sendTab('toggleInspector');
    expect(app.visible).toBe(true);
  });
});
