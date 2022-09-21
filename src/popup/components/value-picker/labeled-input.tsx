import React from 'react';
import styled from 'styled-components';
import {
  kActiveColor,
  kInputBorderColor,
  kInputLabelColor,
} from '~popup/constants';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  margin-right: 8px;

  & input {
    text-align: center;
    outline: none;
    padding: 2px 0;
    margin-bottom: 4px;
    font-family: Menlo;
    width: 100%;
    border: solid 1px ${kInputBorderColor};
  }

  & input:focus {
    border: solid 1px ${kActiveColor};
  }

  & span {
    color: ${kInputLabelColor};
  }
`;

export interface Props {
  label?: string;
  defaultValue?: string;
  value?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  onArrowUp?: (value: string) => void;
  onArrowDown?: (value: string) => void;
  selected?: boolean;
}

interface State {
  // To make user be able to freely input something
  transientValue: string;
}

/**
 * @remarks
 * The internal <input> element is not only tracking the Props.value,
 * but also the internal state `transientValue`.
 */
export class LabeledInput extends React.Component<Props, State> {
  private inputRef: HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {
      transientValue: props.value,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    // change externally, bypass the changing to internal
    if (this.props.value !== nextProps.value) {
      this.setState({
        transientValue: nextProps.value,
      });
    } else if (
      this.state.transientValue !== nextState.transientValue &&
      nextState.transientValue !== this.props.value &&
      this.props.onChange
    ) {
      // change internally(explicitly by user input), emit onChange event
      this.props.onChange(nextState.transientValue);
    }
    return true;
  }

  componentDidUpdate() {
    if (this.props.selected) {
      this.inputRef.select();
    }
  }

  /**
   * Update internal state.
   */
  updateTransientValue = (event: React.FormEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    this.setState({
      transientValue: value,
    });
  };

  emitArrowEvent = (event: React.KeyboardEvent) => {
    const action = {
      // down arrow key
      40: this.props.onArrowDown,
      // up arrow key
      38: this.props.onArrowUp,
    }[event.keyCode];

    if (action) {
      action(this.state.transientValue);
      event.stopPropagation();
      event.preventDefault();
    }
  };

  render() {
    const { maxLength } = this.props;
    const inputProps = { maxLength };
    return (
      <Wrapper>
        <input
          ref={(ref) => (this.inputRef = ref)}
          value={this.state.transientValue}
          onChange={this.updateTransientValue}
          onKeyDown={this.emitArrowEvent}
          {...inputProps}
        />
        <span>{this.props.label}</span>
      </Wrapper>
    );
  }
}
