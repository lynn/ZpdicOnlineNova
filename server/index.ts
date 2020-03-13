//

import * as parser from "body-parser";
import * as connect from "connect-mongo";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import {
  Express,
  NextFunction,
  Request,
  Response
} from "express";
import * as session from "express-session";
import * as mongoose from "mongoose";
import {
  Schema
} from "mongoose";
import * as multer from "multer";
import {
  DictionaryController
} from "/server/controller/dictionary";
import {
  UserController
} from "/server/controller/user";


export const PORT = process.env["PORT"] || 8050;
export const MONGO_URI = process.env["MONGO_URI"] || "mongodb://localhost:27017/zpdic";
export const COOKIE_SECRET = process.env["COOKIE_SECRET"] || "cookie-zpdic";
export const SESSION_SECRET = process.env["SESSION_SECRET"] || "session-zpdic";
export const JWT_SECRET = process.env["JWT_SECRET"] || "jwt-secret";


class Main {

  private application: Express;

  public constructor() {
    this.application = express();
  }

  public main(): void {
    this.setupBodyParsers();
    this.setupCookie();
    this.setupMulter();
    this.setupRenderer();
    this.setupSession();
    this.setupMongo();
    this.setupRouters();
    this.setupErrorHandler();
    this.setupFallback();
    this.listen();
  }

  // リクエストボディをパースするミドルウェアの設定をします。
  private setupBodyParsers(): void {
    let urlencodedParser = parser.urlencoded({extended: false});
    let jsonParser = parser.json();
    this.application.use(urlencodedParser);
    this.application.use(jsonParser);
  }

  private setupCookie(): void {
    let middleware = cookieParser(COOKIE_SECRET);
    this.application.use(middleware);
  }

  // ファイルをアップロードする処理を行う Multer の設定をします。
  // アップロードされたファイルは upload フォルダ内に保存するようにしています。
  private setupMulter(): void {
    let middleware = multer({dest: "./upload/"}).single("file");
    this.application.use(middleware);
  }

  // HTML を出力するテンプレートエンジンの設定をします。
  // とりあえず EJS を使うようにしています。
  // Angular などを使った方が良いと思うので、フロントエンドを真面目に作るようになったら変えようと思います。
  private setupRenderer(): void {
    this.application.set("views", process.cwd() + "/server/view");
    this.application.set("view engine", "ejs");
  }

  // セッション管理を行う express-session の設定を行います。
  // セッションストアとして、MongoDB の該当データベース内の sessions コレクションを用いるようになっています。
  private setupSession(): void {
    let MongoStore = connect(session);
    let store = new MongoStore({url: MONGO_URI, collection: "sessions"});
    let cookie = {maxAge: 6 * 60 * 60 * 1000};
    let middleware = session({store, cookie, secret: SESSION_SECRET, resave: false, saveUninitialized: false});
    this.application.use(middleware);
  }

  // MongoDB との接続を扱う mongoose とそのモデルを自動で生成する typegoose の設定を行います。
  // typegoose のデフォルトでは、空文字列を入れると値が存在しないと解釈されてしまうので、空文字列も受け入れるようにしています。
  private setupMongo(): void {
    let check = function (value: string): boolean {
      return value !== null;
    };
    let SchemaString = Schema.Types.String as any;
    SchemaString.checkRequired(check);
    mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
  }

  // ルーターの設定を行います。
  // このメソッドは、各種ミドルウェアの設定メソッドを全て呼んだ後に実行してください。
  private setupRouters(): void {
    UserController.use(this.application);
    DictionaryController.use(this.application);
  }

  private setupErrorHandler(): void {
    let handler = function (error: any, request: Request, response: Response, next: NextFunction): void {
      console.error(error.stack);
      response.sendStatus(500);
    };
    this.application.use(handler);
  }

  // ルート以外にアクセスしたときのフォールバックの設定をします。
  private setupFallback(): void {
    let fallback = require("express-history-api-fallback");
    let handler = function (request: Request, response: Response, next: NextFunction): void {
      let fullUrl = request.protocol + "://" + request.get("host") + request.originalUrl;
      console.error("Not found: " + fullUrl);
      response.sendStatus(404);
    };
    this.application.use("/api*", handler);
    this.application.use(express.static("dist"));
    this.application.use(fallback("/dist/index.html", {root: "."}));
  }

  private listen(): void {
    this.application.listen(+PORT, () => {
      console.log("\u001b[33m[Express]\u001b[0m Listening on port " + PORT);
    });
  }

}


let main = new Main();
main.main();