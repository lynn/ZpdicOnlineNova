//

import {
  DocumentType,
  Ref,
  getModelForClass,
  modelOptions,
  prop
} from "@typegoose/typegoose";
import {
  WithSize
} from "/server/controller/type";
import {
  Dictionary,
  DictionarySchema
} from "/server/model/dictionary";
import {
  CustomError
} from "/server/model/error";
import {
  Commission as CommissionSkeleton
} from "/server/skeleton/commission";
import {
  QueryRange
} from "/server/util/query";


@modelOptions({schemaOptions: {collection: "commissions"}})
export class CommissionSchema {

  @prop({required: true, ref: "DictionarySchema"})
  public dictionary!: Ref<DictionarySchema>;

  @prop({required: true})
  public name!: string;

  @prop({})
  public comment?: string;

  @prop({required: true})
  public createdDate!: Date;

  public static async findByDictionary(dictionary: Dictionary, range?: QueryRange): Promise<WithSize<Commission>> {
    let query = CommissionModel.find().where("dictionary", dictionary);
    let restrictedQuery = QueryRange.restrict(query, range);
    let countQuery = CommissionModel.countDocuments(query.getFilter());
    let result = await Promise.all([restrictedQuery, countQuery]);
    return result;
  }

  public static async add(dictionary: Dictionary, name: string, comment?: string): Promise<Commission> {
    let commission = new CommissionModel({});
    commission.dictionary = dictionary;
    commission.name = name;
    commission.comment = (comment === "") ? undefined : comment;
    commission.createdDate = new Date();
    await commission.save();
    return commission;
  }

}


export class CommissionCreator {

  public static create(raw: Commission): CommissionSkeleton {
    let id = raw.id;
    let name = raw.name;
    let comment = raw.comment;
    let createdDate = raw.createdDate.toISOString();
    let skeleton = CommissionSkeleton.of({id, name, comment, createdDate});
    return skeleton;

  }

}


export type Commission = DocumentType<CommissionSchema>;
export let CommissionModel = getModelForClass(CommissionSchema);