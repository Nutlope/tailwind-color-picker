import paper from 'paper';
import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import { kSaturationCanvasHeight } from '../constants';
import { ChromaColor } from '../models';

interface WrapperProps {
  color: ChromaColor;
}

const Wrapper = styled.canvas.attrs((props: WrapperProps) => ({
  style: {
    background: `linear-gradient(to top, #000, rgba(0, 0, 0, 0)),
    linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    ${props.color.hueCss()}`,
  },
}))`
  height: ${kSaturationCanvasHeight}px;
`;

export class SaturationCanvas extends React.Component {
  static contextType = ColorContext;
  private project: paper.Project;
  private pointer: paper.Path;
  private width: number;
  private height: number;

  // Somehow context.color is different in setColor and componentDidUpdate,
  // hence we use this flag to skip pointer update in componentDidUpdate.
  private internalUpdating = false;

  private initCanvas = (element: HTMLCanvasElement) => {
    this.project = new paper.Project(element);

    const { width, height } = this.project.view.viewSize;
    this.width = width;
    this.height = height;

    // located at top-right corner
    this.pointer = new paper.Path.Circle({
      center: [this.width, 0],
      radius: 6,
      strokeColor: 'white',
    });

    this.project.view.onMouseDrag = this.updateColor;
    this.project.view.onMouseDown = this.updateColor;
  };

  private updateColor = (event: paper.MouseEvent) => {
    // update pointer position first
    const { x, y } = event.point;
    const px = Math.max(0, Math.min(x, this.width));
    const py = Math.max(0, Math.min(y, this.height));
    this.pointer.position = new paper.Point(px, py);

    this.internalUpdating = true;
    this.context.setColor(this.pointToColor(this.pointer.position));
    this.internalUpdating = false;
  };

  private pointToColor(point: paper.Point): ChromaColor {
    const { x, y } = point;
    return this.context.color.clone({
      s: x / this.width,
      v: 1 - y / this.height,
    });
  }

  private colorToPoint(color: ChromaColor): paper.Point {
    const { s, v } = color.hsv;
    return new paper.Point(s * this.width, (1 - v) * this.height);
  }

  componentDidUpdate() {
    if (this.internalUpdating) {
      return;
    }
    this.pointer.position = this.colorToPoint(this.context.color);
  }

  render() {
    return (
      <Wrapper
        as="canvas"
        ref={this.initCanvas}
        color={this.context.color}
      ></Wrapper>
    );
  }
}
