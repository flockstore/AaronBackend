import {Document, FilterQuery, Model, QueryOptions} from "mongoose";
import {from, Observable} from "rxjs";
import {PartialModel} from "../model/partial-model";
import {map} from "rxjs/operators";

export abstract class ModelService<T extends Document, P extends PartialModel> {

    protected constructor(private model: Model<T>) {
    }

    create(user: P): Observable<T> {
        return from(this.model.create(user));
    }

    get(id: string): Observable<T> {
        return from(this.model.findById(id));
    }

    list(query?: FilterQuery<T>, projection? : any, options?: QueryOptions): Observable<T[]> {
        return from(this.model.find(query, projection, options));
    }

    update(id: string, update: P): Observable<T> {
        return from(this.model.findByIdAndUpdate(id, update, {new: true}));
    }

    delete(id: string): Observable<boolean> {
        return from(this.model.findByIdAndDelete(id)).pipe(
            map(value => true)
        );
    }

}
