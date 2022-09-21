import React from 'react';
import styled from 'styled-components';

interface StyledSliderProps {
  max?: number;
  min?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  primaryBackground?: string;
  secondaryBackground?: string;
  thumbSize?: number;
}

const defaultProps = {
  primaryBackground: 'white',
  secondaryBackground: 'white',
  thumbSize: 10,
};

const Wrapper = styled.div<StyledSliderProps>`
  width: 100%;
  height: 100%;
  border-width: 0;
  border-radius: 2px;
  background-position: center;
  background: ${(props) => props.secondaryBackground};
`;

const Slider = styled.input.attrs((props: StyledSliderProps) => {
  return {
    style: {
      background: props.primaryBackground,
    },
  };
})<StyledSliderProps>`
  appearance: none;
  outline: none;
  width: 100%;
  height: 100%;
  border-width: 0;
  border-radius: 2px;
  cursor: pointer;
  display: block;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${(props) => props.thumbSize}px;
    height: ${(props) => props.thumbSize}px;
    background: white;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.37) 0px 1px 4px 0px;
  }

  &::-webkit-slider-runnable-track {
    margin: -${(props) => props.thumbSize / 2}px;
  }
`;

export function StyledSlider(propsIn: StyledSliderProps) {
  const props = { ...defaultProps, ...propsIn };
  return (
    <Wrapper {...props}>
      <Slider as="input" type="range" step="0.01" {...props}></Slider>
    </Wrapper>
  );
}
