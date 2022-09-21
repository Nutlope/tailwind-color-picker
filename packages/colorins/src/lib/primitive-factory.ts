import paper from 'paper';

const kCursorRaduis = 14;
const kCursorOffset = 18;
const kCursorLineLength = 14;
const kCursorLineWidth = 3;
const kStrokeColor = new paper.Color('#777777');
const kStrokeWidth = 5;

export function createCursor() {
  const cursor = new paper.Group([
    new paper.Path.Circle({
      center: new paper.Point(kCursorOffset, kCursorOffset),
      radius: kCursorRaduis,
      strokeWidth: kStrokeWidth * 1.2,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset, kCursorOffset - kCursorRaduis],
      to: [kCursorOffset, kCursorOffset - kCursorRaduis - kCursorLineLength],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset, kCursorOffset + kCursorRaduis],
      to: [kCursorOffset, kCursorOffset + kCursorRaduis + kCursorLineLength],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset - kCursorRaduis, kCursorOffset],
      to: [kCursorOffset - kCursorRaduis - kCursorLineLength, kCursorOffset],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
    new paper.Path.Line({
      from: [kCursorOffset + kCursorRaduis, kCursorOffset],
      to: [kCursorOffset + kCursorRaduis + kCursorLineLength, kCursorOffset],
      strokeWidth: kCursorLineWidth,
      strokeColor: kStrokeColor,
    }),
  ]);
  return cursor;
}

export function createCircleMask({ radius, children }) {
  const circleClip = new paper.Shape.Circle({
    center: [radius, radius],
    radius: radius,
  });

  const circleBorder = new paper.Shape.Circle({
    center: [radius, radius],
    radius,
    strokeColor: kStrokeColor,
    strokeWidth: kStrokeWidth,
  });

  const mask = new paper.Group([circleClip, ...children, circleBorder]);
  mask.clipped = true;

  return mask;
}
