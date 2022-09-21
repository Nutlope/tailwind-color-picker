import React from 'react';
import { LabeledInput } from './labeled-input';
import { ColorContext } from '~popup/color-context';
import { ChromaColor } from '~popup/models';

interface State {
  selected: boolean;
}

export class HEXInput extends React.Component<{}, State> {
  static contextType = ColorContext;

  constructor(props: {}) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  /**
   * Update the Input value but may not update the context color.
   */
  private updateHEX = (hex: string) => {
    const { setColor } = this.context;
    const color = ChromaColor.create(hex);
    color && setColor(color);
    this.setState({
      selected: false,
    });
  };

  private doMath = (hex: string, delta: number) => {
    const num = parseInt(hex.replace('#', ''), 16);
    if (isNaN(num)) {
      return;
    }

    // safely fill zero from left
    const newNum = (num + delta + 0x1000000).toString(16).substr(1);
    this.updateHEX(`#${newNum}`);
    this.setState({
      selected: true,
    });
  };

  render() {
    const hex = this.context.color.hex;

    return (
      <LabeledInput
        maxLength={9}
        label="HEX"
        value={hex}
        onChange={this.updateHEX}
        onArrowUp={(hex) => this.doMath(hex, 1)}
        onArrowDown={(hex) => this.doMath(hex, -1)}
        selected={this.state.selected}
      />
    );
  }
}
