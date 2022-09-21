import React from 'react';
import styled from 'styled-components';
import { ColorContext } from '../color-context';
import { kCirclePickerSize, kAlphaGridCss } from '../constants';
import { ChromaColor } from '../models';

interface WrapperProps {
  color: ChromaColor;
}

const Wrapper = styled.div.attrs((props: WrapperProps) => ({
  style: {
    background: props.color.css(),
  },
}))`
  width: ${kCirclePickerSize}px;
  height: ${kCirclePickerSize}px;
  border-radius: 50%;
  position: relative;

  &::before {
    content: '\\00a0';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    border-radius: 50%;
    background: ${kAlphaGridCss};
  }
`;

export class CirclePicker extends React.Component {
  static contextType = ColorContext;

  render() {
    return <Wrapper color={this.context.color}></Wrapper>;
  }
}
