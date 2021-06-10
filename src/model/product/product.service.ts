import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ModelService} from '../../common/service/model.service';
import {Product, ProductDocument, ProductPartial} from './entity/product.entity';

@Injectable()
export class ProductService extends ModelService<ProductDocument, ProductPartial> {

    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {
        super(productModel);
    }

}
