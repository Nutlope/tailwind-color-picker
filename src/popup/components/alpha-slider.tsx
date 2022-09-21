import React from 'react';
import styled from 'styled-components';
import { useColorContext } from '../color-context';
import { kSliderHeight, kAlphaGridCss, kSliderThumbSize } from '../constants';
import { StyledSlider } from './styled-slider';

const Wrapper = styled.div`
  height: ${kSliderHeight}px;
`;

export function AlphaSlider() {
  const { color, setColor } = useColorContext();
  const updateColor = (event: React.FormEvent<HTMLInputElement>) => {
    setColor(
      color.clone({
        a: parseFloat((event.target as HTMLInputElement).value),
      })
    );
  };
  return (
    <Wrapper>
      <StyledSlider
        max={1}
        min={0}
        value={color.alpha}
        onChange={updateColor}
        primaryBackground={`linear-gradient(to right, rgba(0, 0, 0, 0) 0%, ${color.rgbCss()} 100%)`}
        secondaryBackground={kAlphaGridCss}
        thumbSize={kSliderThumbSize}
      />
    </Wrapper>
  );
}
