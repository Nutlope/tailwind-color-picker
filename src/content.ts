import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'regenerator-runtime/runtime';
import { Inspector, inspectorFactory } from 'colorins';
import { AppManager } from './core';
import { container } from '~/common';
import { App, Snackbar, snackbarFactory } from '~/elements';

const dom = document.createElement('ac-root');
document.body.insertAdjacentElement('afterbegin', dom);

const canvas = document.createElement('canvas');
const afterInjected = dom.injectCanvas(canvas).then(() => {
  container.bind<App>(App).toConstantValue(dom);
  container.bind<AppManager>(AppManager).toSelf();
  container
    .bind<Inspector>(Inspector)
    .toConstantValue(inspectorFactory(canvas));
  container.bind<Snackbar>(Snackbar).toConstantValue(snackbarFactory(dom));
  return container.resolve(AppManager);
});

export { afterInjected };
