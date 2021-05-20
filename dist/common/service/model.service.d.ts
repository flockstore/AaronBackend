import { Document, FilterQuery, Model, QueryOptions } from "mongoose";
import { Observable } from "rxjs";
import { PartialModel } from "../model/partial-model";
export declare abstract class ModelService<T extends Document, P extends PartialModel> {
    private model;
    protected constructor(model: Model<T>);
    create(user: P): Observable<T>;
    get(id: string): Observable<T>;
    list(query?: FilterQuery<T>, projection?: any, options?: QueryOptions): Observable<T[]>;
    update(id: string, update: P): Observable<T>;
    delete(id: string): Observable<any>;
}
