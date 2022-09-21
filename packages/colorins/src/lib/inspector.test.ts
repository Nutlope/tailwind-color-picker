import paper from 'paper';
import { Inspector } from './inspector';

describe('Inspector', () => {
  it('should create a Inspector instance', () => {
    const project = new paper.Project(document.createElement('canvas'));
    const inspector = new Inspector(project);
    expect(inspector).toBeTruthy();
  });
});
