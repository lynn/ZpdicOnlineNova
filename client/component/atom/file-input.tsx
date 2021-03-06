//

import * as react from "react";
import {
  ChangeEvent,
  ReactNode
} from "react";
import Label from "/client/component/atom/label";
import Component from "/client/component/component";
import {
  style
} from "/client/component/decorator";


@style(require("./file-input.scss"))
export default class FileInput extends Component<Props, State> {

  public static defaultProps: DefaultProps = {
    file: null,
    buttonLabel: null
  };
  public state: State = {
    fileName: ""
  };

  private handleChange(event: ChangeEvent<HTMLInputElement>): void {
    let files = event.target.files;
    if (files && files.length > 0) {
      let file = files[0];
      let fileName = file.name;
      this.setState({fileName});
      if (this.props.onSet) {
        this.props.onSet(file);
      }
    }
  }

  public render(): ReactNode {
    let node = (
      <div styleName="root" className={this.props.className}>
        <label styleName="input-wrapper">
        <Label text={this.props.inputLabel}/>
          <input styleName="input" type="text" value={this.state.fileName} readOnly={true}/>
        </label>
        <label styleName="button">
          {this.props.buttonLabel ?? this.trans("fileInput.button")}
          <input styleName="file" type="file" onChange={this.handleChange.bind(this)}/>
        </label>
      </div>
    );
    return node;
  }

}


type Props = {
  file: File | null,
  inputLabel?: string,
  buttonLabel: string | null,
  onSet?: (file: File | null) => void,
  className?: string
};
type DefaultProps = {
  file: File | null,
  buttonLabel: string | null
};
type State = {
  fileName: string
};