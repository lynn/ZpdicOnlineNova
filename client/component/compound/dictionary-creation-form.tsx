//

import * as react from "react";
import {
  MouseEvent,
  ReactNode
} from "react";
import {
  withRouter
} from "react-router-dom";
import {
  Button,
  Input
} from "/client/component/atom";
import {
  ComponentBase
} from "/client/component/component";
import {
  applyStyle
} from "/client/util/decorator";
import * as http from "/client/util/http";


@applyStyle(require("./dictionary-creation-form.scss"))
class DictionaryCreationFormBase extends ComponentBase<Props, State> {

  public state: State = {
    name: ""
  };

  private async click(event: MouseEvent<HTMLElement>): Promise<void> {
    let name = this.state.name;
    let dictionary = await http.post("dictionaryCreate", {name});
    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }

  public render(): ReactNode {
    let node = (
      <form styleName="root">
        <Input label="名称" onValueChange={(value) => this.setState({name: value})}/>
        <Button label="新規作成" onClick={this.click.bind(this)}/>
      </form>
    );
    return node;
  }

}


type Props = {
  onSubmit?: () => void
};
type State = {
  name: string;
};

export let DictionaryCreationForm = withRouter(DictionaryCreationFormBase);