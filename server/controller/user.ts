//

import {
  Controller,
  GetRequest,
  GetResponse,
  PostRequest,
  PostResponse
} from "/server/controller/controller";
import {
  authenticate,
  verifyUser
} from "/server/controller/middle";
import {
  SERVER_PATH
} from "/server/controller/type";
import {
  CustomErrorSkeleton
} from "/server/model/error";
import {
  UserModel,
  UserSkeleton
} from "/server/model/user";
import {
  before,
  controller,
  get,
  post
} from "/server/util/decorator";


@controller("/")
export class UserController extends Controller {

  @post(SERVER_PATH["userRegister"])
  public async postRegister(request: PostRequest<"userRegister">, response: PostResponse<"userRegister">): Promise<void> {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    try {
      let user = await UserModel.register(name, email, password);
      let body = new UserSkeleton(user);
      response.send(body);
    } catch (error) {
      let body;
      if (error.name === "CustomError") {
        if (error.type === "duplicateName") {
          body = new CustomErrorSkeleton("duplicateName");
        } else if (error.type === "invalidPassword") {
          body = new CustomErrorSkeleton("invalidPassword");
        }
      } else if (error.name === "ValidationError") {
        if (error.errors.name) {
          body = new CustomErrorSkeleton("invalidName");
        } else if (error.errors.email) {
          body = new CustomErrorSkeleton("invalidEmail");
        }
      }
      if (body) {
        response.status(400).json(body);
      } else {
        throw error;
      }
    }
  }

  @post(SERVER_PATH["userLogin"])
  @before(authenticate("1y"))
  public async postLogin(request: PostRequest<"userLogin">, response: PostResponse<"userLogin">): Promise<void> {
    let token = request.token;
    let user = request.user;
    if (token && user) {
      let rawBody = new UserSkeleton(user);
      let body = {...rawBody, token};
      response.json(body);
    } else {
      let body = new CustomErrorSkeleton("invalidRequest");
      response.status(400).json(body);
    }
  }

  @get(SERVER_PATH["userInfo"])
  @before(verifyUser())
  public async getInfo(request: GetRequest<"userInfo">, response: GetResponse<"userInfo">): Promise<void> {
    let user = request.user!;
    let body = new UserSkeleton(user);
    response.json(body);
  }

}