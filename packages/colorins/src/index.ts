import paper from 'paper';
import { Inspector } from './lib/inspector';
export * from './lib/inspector';

export const inspectorFactory = (canvas: HTMLCanvasElement): Inspector => {
  const project = new paper.Project(canvas);
  const inspector = new Inspector(project);
  canvas.style.cursor = 'none';
  return inspector;
};
