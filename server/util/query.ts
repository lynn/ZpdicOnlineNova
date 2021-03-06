//

import {
  Query
} from "mongoose";
import {
  WithSize
} from "/server/controller/type";


export class QueryRange {

  public offset?: number;
  public size?: number;

  public constructor(offset?: number, size?: number) {
    this.offset = offset;
    this.size = size;
  }

  public restrict<T, Q extends Query<Array<T>>>(query: Q): Q {
    if (this.offset !== undefined) {
      query = query.skip(this.offset);
    }
    if (this.size !== undefined) {
      query = query.limit(this.size);
    }
    return query;
  }

  public restrictArray<T>(query: Array<T>): Array<T> {
    let start = this.offset ?? 0;
    let end = (this.size !== undefined) ? start + this.size : undefined;
    return query.slice(start, end);
  }

  public static restrict<T, Q extends Query<Array<T>>>(query: Q, range?: QueryRange): Q {
    if (range !== undefined) {
      return range.restrict(query);
    } else {
      return query;
    }
  }

  public static restrictArray<T>(query: Array<T>, range?: QueryRange): Array<T> {
    if (range !== undefined) {
      return range.restrictArray(query);
    } else {
      return query;
    }
  }

  public static restrictWithSize<T>(query: Query<Array<T>>, range?: QueryRange): PromiseLike<WithSize<T>> {
    let anyQuery = query as any;
    let restrictedQuery = QueryRange.restrict(query, range);
    let countQuery = anyQuery.model.countDocuments(query.getFilter());
    let promise = Promise.all([restrictedQuery, countQuery]);
    return promise;
  }

}