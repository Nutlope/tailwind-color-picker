import React from 'react';
import styled from 'styled-components';
import { HEXInput } from './hex-input';
import { RGBAInput } from './rgba-input';
import { ColorContext } from '~popup/color-context';
import { kUpDownArrowSize, kUpDownArrowCss } from '~popup/constants';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-family: Menlo;
`;

const UpDownArrow = styled.div`
  background: ${kUpDownArrowCss};
  border-radius: 2px;
  width: ${kUpDownArrowSize}px;
  height: ${kUpDownArrowSize}px;
  background-size: contain;

  &:hover {
    background: ${kUpDownArrowCss}, #eeeeee;
    background-size: contain;
  }
`;

interface ValuePickerState {
  pickerIndex: number;
}

const pickers = [<HEXInput key={0} />, <RGBAInput key={1} />];

export class ValuePicker extends React.Component<{}, ValuePickerState> {
  static contextType = ColorContext;

  constructor(props: null) {
    super(props);
    this.state = {
      pickerIndex: 0,
    };
  }

  rotatePicker = () => {
    this.setState({
      pickerIndex: (this.state.pickerIndex + 1) % 2,
    });
  };

  render() {
    return (
      <Wrapper>
        {pickers[this.state.pickerIndex]}
        <UpDownArrow onClick={this.rotatePicker} />
      </Wrapper>
    );
  }
}
