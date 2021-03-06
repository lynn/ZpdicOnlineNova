//

import * as react from "react";
import {
  ReactNode
} from "react";
import Component from "/client/component/component";
import DictionaryPane from "/client/component/compound/dictionary-pane";
import PaneList from "/client/component/compound/pane-list";
import {
  style
} from "/client/component/decorator";
import {
  WithSize
} from "/server/controller/type";
import {
  DetailedDictionary,
  UserDictionary
} from "/server/skeleton/dictionary";


@style(require("./dictionary-list.scss"))
export default class DictionaryList extends Component<Props, State> {

  public static defaultProps: DefaultProps = {
    showLinks: false
  };

  public render(): ReactNode {
    let outerThis = this;
    let renderer = function (dictionary: DetailedDictionary | UserDictionary): ReactNode {
      let showLinks = outerThis.props.showLinks && "authorities" in dictionary;
      let canOwn = "authorities" in dictionary && dictionary.authorities.indexOf("own") >= 0;
      let dictionaryNode = (
        <DictionaryPane
          dictionary={dictionary}
          key={dictionary.id}
          showUser={outerThis.props.showUser}
          showUpdatedDate={outerThis.props.showUpdatedDate}
          showCreatedDate={outerThis.props.showCreatedDate}
          showSettingLink={showLinks && canOwn}
          showDownloadLink={showLinks}
        />
      );
      return dictionaryNode;
    };
    let node = (
      <PaneList items={this.props.dictionaries} size={this.props.size} renderer={renderer}/>
    );
    return node;
  }

}


type Props = {
  dictionaries: Array<DetailedDictionary> | DetailedDictionaryProvider | null,
  showUser?: boolean,
  showUpdatedDate?: boolean,
  showCreatedDate?: boolean,
  showLinks: boolean,
  size: number
};
type DefaultProps = {
  showLinks: boolean
};
type State = {
};

export type DetailedDictionaryProvider = (offset?: number, size?: number) => Promise<WithSize<DetailedDictionary>>;