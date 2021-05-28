import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument, UserPartial} from './entity/user.entity';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {from, Observable} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {Group} from '../group/entity/group.entity';

@Injectable()
export class UserService extends ModelService<UserDocument, UserPartial> {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
        super(userModel);
    }

    /**
     * Updates the user while preventing group update from manual query.
     * @param id of the user to update.
     * @param update partial.
     */
    update(id: string, update: UserPartial): Observable<UserDocument> {
        Reflect.deleteProperty(update, 'groups');
        return super.update(id, update);
    }

    addGroup(user: string, group: string): Observable<UserDocument> {
        return super.update(user, {$push: {groups: {group, joinedAt: new Date()}}} as any);
    }

    removeGroup(user: string, group: string): Observable<UserDocument> {
        return this.get(user).pipe(
            mergeMap(record => {
                record.groups = record.groups.filter(g => (g.group as Group)._id.toString() !== group.toString());
                return from(record.save());
            })
        )
    }

}
