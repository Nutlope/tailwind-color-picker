import React from 'react';
import { LabeledInput, Props as LabeledInputProps } from './labeled-input';
import { ColorContext } from '~popup/color-context';

type RGBAKey = 'r' | 'g' | 'b' | 'a';

interface State {
  selectedOn: RGBAKey;
}

interface InputPropsFactoryPayload {
  rgbaKey: RGBAKey;
  mathUnit: number;
  maxLength: number;
}

export class RGBAInput extends React.Component<{}, State> {
  static contextType = ColorContext;

  constructor(props: {}) {
    super(props);
    this.state = {
      selectedOn: null,
    };
  }

  private updateColor = (rgbaKey: RGBAKey, value: string) => {
    const { color, setColor } = this.context;
    const num = parseFloat(value);
    if (isNaN(num)) {
      return;
    }
    setColor(color.cloneRGB({ [rgbaKey]: num }));
    this.setState({
      selectedOn: null,
    });
  };

  private doMath = (rgbaKey: RGBAKey, value: string, delta: number) => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return;
    }
    this.updateColor(rgbaKey, (num + delta).toString());
    this.setState({
      selectedOn: rgbaKey,
    });
  };

  private inputPropsFactory = (
    payload: InputPropsFactoryPayload
  ): Partial<LabeledInputProps> => {
    const { rgbaKey, mathUnit, maxLength } = payload;
    const { color } = this.context;
    const value = (rgbaKey === 'a'
      ? color.alpha
      : color.rgb[rgbaKey]
    ).toString();

    const isSelected = (rgbaKey: RGBAKey) => {
      return this.state.selectedOn === rgbaKey;
    };
    return {
      maxLength,
      label: rgbaKey.toUpperCase(),
      onChange: (value) => this.updateColor(rgbaKey, value),
      onArrowUp: (value) => this.doMath(rgbaKey, value, mathUnit),
      onArrowDown: (value) => this.doMath(rgbaKey, value, -mathUnit),
      selected: isSelected(rgbaKey),
      value,
    };
  };

  render() {
    return (
      <>
        <LabeledInput
          {...this.inputPropsFactory({
            rgbaKey: 'r',
            mathUnit: 1,
            maxLength: 3,
          })}
        />
        <LabeledInput
          {...this.inputPropsFactory({
            rgbaKey: 'g',
            mathUnit: 1,
            maxLength: 3,
          })}
        />
        <LabeledInput
          {...this.inputPropsFactory({
            rgbaKey: 'b',
            mathUnit: 1,
            maxLength: 3,
          })}
        />
        <LabeledInput
          {...this.inputPropsFactory({
            rgbaKey: 'a',
            mathUnit: 0.01,
            maxLength: 4,
          })}
        />
      </>
    );
  }
}
