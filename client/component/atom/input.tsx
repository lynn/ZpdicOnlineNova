//

import * as react from "react";
import {
  ChangeEvent,
  Component,
  ReactNode
} from "react";
import {
  applyStyle
} from "../../util/decorator";


@applyStyle(require("./input.scss"))
export class Input extends Component<InputProps, InputState> {

  public static defaultProps: InputProps = {
    label: "",
    type: "text"
  };

  public state: InputState = {
    value: ""
  };

  private change(event: ChangeEvent<HTMLInputElement>): void {
    let value = event.target.value;
    this.setState({value});
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  public render(): ReactNode {
    return (
      <label styleName="input-wrapper">
        <div styleName="label">{this.props.label}</div>
        <input styleName="input" type={this.props.type} value={this.state.value} onChange={this.change.bind(this)}/>
      </label>
    );
  }

}


type InputProps = {
  label: string,
  type: "text" | "password",
  onChange?: ((value: string) => void)
};

type InputState = {
  value: string
};