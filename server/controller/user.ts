//

import {
  Request,
  Response
} from "express-serve-static-core";
import {
  UserBody,
  UserLoginBody,
  UserRegisterBody
} from "/client/type/user";
import {
  Controller
} from "/server/controller/controller";
import * as middle from "/server/controller/middle";
import {
  UserModel
} from "/server/model/user";
import {
  before,
  controller,
  get,
  post
} from "/server/util/decorator";
import "/server/util/extension";


@controller("/api/user")
export class UserController extends Controller {

  @get("/register")
  public getRegister(request: Request, response: Response): void {
    response.render("register.ejs");
  }

  @post("/register")
  public async postRegister(request: Request, response: Response<UserRegisterBody>): Promise<void> {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    try {
      let user = await UserModel.register(name, email, password);
      response.send({name});
    } catch (error) {
      if (error.name === "CustomError") {
        response.status(400).json({error: error.type});
      } else {
        throw error;
      }
    }
  }

  @get("/login")
  public getLogin(request: Request, response: Response): void {
    response.render("login.ejs");
  }

  @post("/login")
  @before(middle.authenticate("1y"))
  public async postLogin(request: Request, response: Response<UserLoginBody>): Promise<void> {
    let token = request.token;
    let user = request.user;
    if (token && user) {
      let name = user.name;
      response.json({token, name});
    } else {
      response.status(400).json({error: "invalidRequest"});
    }
  }

  @get("/info")
  @before(middle.verifyToken())
  public async getInfo(request: Request, response: Response<UserBody>): Promise<void> {
    let user = request.user!;
    let name = user.name;
    let email = user.email;
    response.json({name, email});
  }

}