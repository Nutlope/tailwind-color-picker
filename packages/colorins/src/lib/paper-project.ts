import paper from 'paper';

export class PaperProject extends paper.Project {}

export const paperProjectFactory = (
  canvas: HTMLCanvasElement,
): PaperProject => {
  const project = new paper.Project(canvas);
  return project;
};
