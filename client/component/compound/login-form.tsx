//

import * as react from "react";
import {
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
  FormPane
} from "/client/component/compound";
import {
  applyStyle,
  inject,
  route
} from "/client/component/decorator";


@route @inject
@applyStyle(require("./login-form.scss"))
export class LoginForm extends StoreComponent<Props, State> {

  public state: State = {
    name: "",
    password: "",
    errorType: null
  };

  private async performLogin(): Promise<void> {
    let name = this.state.name;
    let password = this.state.password;
    let response = await this.login({name, password}, true);
    if (response.status === 200) {
      this.replacePath("/dashboard");
    } else {
      this.setState({errorType: "loginFailed"});
    }
  }

  private async jumpRegister(): Promise<void> {
    this.pushPath("/register");
  }

  private async jumpResetPassword(): Promise<void> {
    this.pushPath("/reset");
  }

  public render(): ReactNode {
    let registerNode = (this.props.showsRegister) && (
      <Button label="新規登録" style="link" onClick={this.jumpRegister.bind(this)}/>
    );
    let node = (
      <FormPane errorType={this.state.errorType} onErrorClose={() => this.setState({errorType: null})}>
        <form styleName="root">
          <Input label="ユーザー名" value={this.state.name} onSet={(name) => this.setState({name})}/>
          <Input label="パスワード" type="flexible" value={this.state.password} onSet={(password) => this.setState({password})}/>
          <div styleName="button-group">
            <div styleName="row">
              <Button label="ログイン" reactive={true} onClick={this.performLogin.bind(this)}/>
              {registerNode}
            </div>
            <div styleName="row">
              <Button label="パスワードを忘れた" style="link" onClick={this.jumpResetPassword.bind(this)}/>
            </div>
          </div>
        </form>
      </FormPane>
    );
    return node;
  }

}


type Props = {
  showsRegister: boolean
};
type State = {
  name: string,
  password: string,
  errorType: string | null
};