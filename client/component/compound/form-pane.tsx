//

import * as react from "react";
import {
  MouseEvent,
  ReactNode
} from "react";
import Component from "/client/component/component";
import InformationPane from "/client/component/compound/information-pane";
import {
  style
} from "/client/component/decorator";
import {
  PopupUtil
} from "/client/util/popup";


@style(require("./form-pane.scss"))
export default class FormPane extends Component<Props, State> {

  public static defaultProps: DefaultProps = {
    errorType: null,
    errorStyle: "error"
  };

  public render(): ReactNode {
    let errorType = this.props.errorType;
    let errorStyle = this.props.errorStyle;
    let texts = [PopupUtil.getMessage(this.props.intl!, errorType ?? "")];
    let errorNode = (errorType !== null) && (
      <div styleName="error">
        <InformationPane texts={texts} style={errorStyle} onClose={this.props.onErrorClose}/>
      </div>
    );
    let node = (
      <div>
        {errorNode}
        <div styleName="root">
          {this.props.children}
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
  errorType: string | null,
  errorStyle: "error" | "information",
  onErrorClose?: (event: MouseEvent<HTMLButtonElement>) => void
};
type DefaultProps = {
  errorType: string | null,
  errorStyle: "error" | "information"
};
type State = {
};