//

import * as react from "react";
import {
  render
} from "react-dom";
import {
  Root
} from "/client/component/root";


export const TITLES = ["ZpDIC", "Online"];
export const VERSION = "dev:2968.0";


class Main {

  public main(): void {
    this.render();
  }

  private render(): void {
    render(<Root/>, document.getElementById("root"));
  }

}


let main = new Main();
main.main();