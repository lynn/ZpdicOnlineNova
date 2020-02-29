//

import * as react from "react";
import {
  Component,
  MouseEvent,
  ReactNode
} from "react";
import {
  applyStyle
} from "../../util/decorator";
import history from "../history";


@applyStyle(require("./menu-item.scss"))
export class MenuItem extends Component<MenuItemProps, {}> {

  public static defaultProps: MenuItemProps = {
    label: "",
    highlight: false
  };

  private click(event: MouseEvent<HTMLDivElement>): void {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    if (this.props.href) {
      history.push(this.props.href);
    }
  }

  public render(): ReactNode {
    let styleNames = ["menu-item"];
    if (this.props.highlight) {
      styleNames.push("highlight");
    }
    return (
      <div styleName={styleNames.join(" ")} onClick={this.click.bind(this)}>
        {this.props.label}
      </div>
    );
  }

}


type MenuItemProps = {
  label: string,
  highlight: boolean,
  href?: string,
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};