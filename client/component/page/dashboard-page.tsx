//

import * as react from "react";
import {
  ReactNode
} from "react";
import {
  withRouter
} from "react-router-dom";
import {
  ComponentBase
} from "/client/component/component";
import {
  DictionaryList,
  Header,
  Menu
} from "/client/component/compound";
import {
  applyStyle
} from "/client/util/decorator";
import * as http from "/client/util/http";
import {
  DictionaryListBody
} from "/server/type/dictionary";


@applyStyle(require("./dashboard-page.scss"))
class DashboardPageBase extends ComponentBase<Props, State, Params> {

  public state: State = {
    dictionaries: []
  };

  public componentDidMount(): void {
    this.inPrivate(async () => {
      let response = await http.get<DictionaryListBody>("/api/dictionary/list");
      let dictionaries = response.data;
      this.setState({dictionaries});
    });
  }

  public render(): ReactNode {
    let mode = this.props.match?.params.mode || "dictionary";
    let contentNode;
    if (mode === "dictionary") {
      contentNode = <DictionaryList dictionaries={this.state.dictionaries}/>;
    } else {
      contentNode = "Nothing";
    }
    let node = (
      <div styleName="dashboard-page">
        <Header/>
        <div styleName="content-wrapper">
          <Menu mode={mode}/>
          <div styleName="content">
            {contentNode}
          </div>
        </div>
      </div>
    );
    return node;
  }

}


type Props = {
};
type State = {
  dictionaries: DictionaryListBody;
};
type Params = {
  mode: string
};

export let DashboardPage = withRouter(DashboardPageBase);