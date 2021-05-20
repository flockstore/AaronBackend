import {Document, FilterQuery, Model, QueryOptions} from "mongoose";
import {from, Observable} from "rxjs";
import {PartialModel} from "../model/partial-model";
import {SoftDeleteDocument, SoftDeleteModel} from "mongoose-delete";

export abstract class ModelService<T extends Document & SoftDeleteDocument, P extends PartialModel> {

    private readonly model: SoftDeleteModel<T>

    protected constructor(private hardModel: Model<T>) {
        this.model = hardModel as SoftDeleteModel<T>;
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

    delete(id: string, author?: string): Observable<T> {
        return this.model.deleteById(id, author);
    }

}
