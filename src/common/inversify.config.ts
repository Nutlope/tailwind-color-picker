import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { MessageService } from './message-service';

const container = new Container();
container.bind<MessageService>(MessageService).toSelf();

const { lazyInject } = getDecorators(container);

export { container, lazyInject };
