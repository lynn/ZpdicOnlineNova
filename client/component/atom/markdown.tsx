//

import * as react from "react";
import {
  ReactNode
} from "react";
import ReactMarkdown from "react-markdown";
import Link from "/client/component/atom/link";
import Component from "/client/component/component";
import {
  style
} from "/client/component/decorator";


@style(require("./markdown.scss"))
export default class Markdown extends Component<Props, State> {

  public render(): ReactNode {
    let node = (
      <div styleName="root" className={this.props.className}>
        <ReactMarkdown
          source={this.props.source}
          renderers={{link: Link}}
          disallowedTypes={["thematicBreak", "image", "imageReference", "definition", "heading", "html", "virtualHtml"]}
        />
      </div>
    );
    return node;
  }

}


type Props = {
  source: string,
  className?: string
};
type State = {
};