//

import * as react from "react";
import {
  MouseEvent,
  ReactNode
} from "react";
import {
  Button,
  Input
} from "/client/component/atom";
import {
  StoreComponent
} from "/client/component/component";
import {
  applyStyle,
  inject,
  intl,
  route
} from "/client/component/decorator";
import {
  createValidate
} from "/client/util/misc";
import {
  PopupUtil
} from "/client/util/popup";
import {
  validatePassword as rawValidatePassword
} from "/server/model/validation";


@route @inject @intl
@applyStyle(require("./change-user-password-form.scss"))
export class ChangeUserPasswordForm extends StoreComponent<Props, State> {

  public state: State = {
    password: ""
  };

  private async handleClick(): Promise<void> {
    let password = this.state.password;
    let response = await this.requestPost("changeUserPassword", {password});
    if (response.status === 200) {
      this.props.store!.addInformationPopup("passwordChanged");
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    }
  }

  public render(): ReactNode {
    let validate = createValidate(rawValidatePassword, PopupUtil.getMessage(this.props.intl!, "invalidPassword"));
    let node = (
      <form styleName="root">
        <Input label={this.trans("changeUserPasswordForm.password")} type="flexible" value={this.state.password} validate={validate} usesTooltip={true} onSet={(password) => this.setState({password})}/>
        <Button label={this.trans("changeUserPasswordForm.confirm")} reactive={true} onClick={this.handleClick.bind(this)}/>
      </form>
    );
    return node;
  }

}


type Props = {
  onSubmit?: () => void
};
type State = {
  password: string
};