//

import {
  Skeleton
} from "/server/skeleton/skeleton";


export class Notification extends Skeleton {

  public id!: string;
  public type!: string;
  public date!: string;
  public title!: string;
  public text!: string;

}